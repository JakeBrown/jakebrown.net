import type { EntryContext } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "react-router";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext?: unknown
) {
  const userAgent = request.headers.get("user-agent");

  // If it's a bot, wait for the full render
  const waitForAll = userAgent && isbot(userAgent);

  const stream = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (waitForAll) {
    await stream.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}