import { jsxRenderer } from "hono/jsx-renderer";
import { Style } from "hono/css";
import Nav from "../components/nav";
import { Suspense } from "hono/jsx";
import Loading from "../components/loading";

export const base = jsxRenderer(
  ({ children }) => {
    return (
      <html>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link href="/static/css/style.css" rel="stylesheet" />
          <link rel="stylesheet" href="/static/css/night-owl.min.css"></link>
          <script src="/static/js/htmx-2.0.4.min.js" defer></script>
          <script src="/static/js/preload-2.1.1.min.js" defer></script>
          <script src="/static/js/response-targets-2.0.3.min.js" defer></script>
          <link href="/static/css/fira.css" rel="stylesheet"></link>
          <Style />
        </head>
        <body hx-ext="preload,response-targets">
          <Nav />
          <main>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </body>
      </html>
    );
  },
  { stream: true }
);
