---
title: "RQ with SQS"
date: "2022-04-14"
tags: ["AWS"]
status: "published"
---

[RQ](https://python-rq.org) is a great library for building a simple decoupled worker queue, which can invoke arbitrary functions from your code base. 

As the name implies, it requires a redis service. If you're deploying on AWS, you might already have familiarity with SQS and prefer to use that instead. Inspired by RQ, here's how we do it with no dependencies whatsoever...

---

## Considerations
This comes with all the same caveats as RQ, in that it is very tightly coupled, and absolutely not a substitute for a loosely-coupled pub-sub system (i.e. SNS->SQS).

There is also no priority management. You could build that, but it's probably worth reaching for something like [Celery](https://github.com/celery/celery) at that point. 

So what is it useful for? Really just one thing: executing an arbitrary function, with guaranteed at-least-once execution, plus retries and timeout. 

## Architecture
We're on AWS, so we may as well use Lambda. In that situation, we would have the following:

### 1. Main application
A Lambda function running [Flask](https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/flask), hooked up to API gateway. 

If you can't deal with the cold starts or can't deploy to Lambda for some other reason, you could just as easily run the Flask application in ECS or App Runner etc. 

### 2. Background worker
A Lambda function handling SQS events.

The key point is that both the main application and the background worker share the same code base. Ideally for simplicity, you deploy the same Docker image to both. 


## Implementation

First, we need to define our function to queue the message to SQS:

```python
def enqueue(func_name, *args, **kwargs):
        payload = {"func_name": func_name, "args": args, "kwargs": kwargs}
        response = boto3.client("sqs").send_message(
            QueueUrl=environ["WORKER_QUEUE_URL"],
            DelaySeconds=0,
            MessageBody=json.dumps(payload),
        )

```


Then we can call it anywhere we like, passing in the fully qualified path name of the function we want to call, plus any arguments:

``` python
enqueue("app.emailer.send_email", "person@gmail.com", "Hello", "Here is the body")
```

In this case, the function name we pass in is a simple function to send an email, looking like this:
```python
def send_email(email_address, subject, body):
    //Send email via SMTP etc
```

Create a new file, where the handler function will live. This is heavily inspired by RQ:

```python
import yaml
from os import environ
import importlib
import logging
import boto3
from botocore.exceptions import ClientError
import json
import threading


TIMEOUT_WARNING = int(environ["TIMEOUT_WARNING"])


def import_function(name):
    name_bits = name.split(".")
    module_name = ".".join(name_bits[:-1])
    module = importlib.import_module(module_name)
    function_name = name_bits[-1]
    return getattr(module, function_name)


class TimeoutThread(threading.Thread):
    """Creates a Thread which runs (sleeps) for a time duration equal to
    timeout and raises an exception if it is not stopped
    """

    def __init__(self, lambda_payload):
        # type: (float, int) -> None
        threading.Thread.__init__(self)
        self.lambda_payload = lambda_payload
        self._stop_event = threading.Event()

    def stop(self):
        self._stop_event.set()

    def run(self):
        self._stop_event.wait(TIMEOUT_WARNING)

        if self._stop_event.is_set():
            return

        # If we get to this point we need to log a timeout warning
        logging.error("Lambda timeout warning triggered")

def handler(event, context):
    if len(event["Records"]) > 1:
        raise ValueError("Lambda should only process one event at a time")
    record = event["Records"][0]
    message = json.loads(record["body"])
    timeout_thread = TimeoutThread(
        message
    )
    timeout_thread.start()

    func = import_function(message["func_name"])
    args = message["args"]
    kwargs = message["kwargs"]
    func(*args, **kwargs)
    timeout_thread.stop()
``` 

Or you may want to wrap it in an app context:

```python
from flask_client import create_app
...
with app.app_context():
    func(*args, **kwargs)
```

The whole timeout thing is really only necessary if you're having trouble getting error messages relating to timeouts. If the Lambda timeout is triggered, then it just shuts down. But if you have an internal timeout running inside Lambda, it gives you the chance to add some logging or send it to Sentry. 

When deploying, you will want to set the timeout warning to less than the lambda timeout. For example, if the lambda timeout is 900 seconds, set the timeout warning to 880 seconds. 

## Deploy
Remember, all of this lives inside the same code base. We build just one docker image, but execute it in different ways. 

Running the flask application is no different to usual. Probably just follow the instructions [here](https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/flask). 

To run the background worker, we need configure lambda to run the same docker image, but using [awslambdaric](https://pypi.org/project/awslambdaric/). That's the *AWS Lambda Python Runtime Interface Client*, and it allows correct parsing of the SQS payload and running the handler function:

After installing `awslambdaric`, we configure the lambda function docker with the following:

``` bash
entry_point = ["python", "-m", "awslambdaric"]
command     = ["lambda.handler"]
```

	
