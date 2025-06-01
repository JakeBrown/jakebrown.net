---
title: "Python Dependency Management"
date: "2024-07-05"
tags: ["python","snippets"]
status: "published"
---

Python package management has long been a struggle. In [January 2017](https://github.com/pypa/pipenv/commit/2d791e1393a8a6f0bd12007a746551109946a61c), the PipEnv project was started, and by 2018 it became the officially recommended package manager. 

It brought a fantastic npm-like experience to Python, with easy configuration via a YAML `Pipfile` and a straightforward CLI. But then it went dead, not seeing any releases between November 2018 and April 2020. People moved on to Poetry, and I ended up using Conda quite a bit, especially when numpy/scipy was required.

While it does look like PipEnv has seen regular releases since April 2020, I'm seeing more people just use the built in pip+virtualenv tools. Here is how to do that...

---

From the Python [docs](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/).

## Create and activate a virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

## Install dependencies
```bash
python3 -m pip install --upgrade requests
python3 -m pip install -r requirements.txt
python3 -m pip freeze
```

## Deactivate environment
```bash
deactivate
```
