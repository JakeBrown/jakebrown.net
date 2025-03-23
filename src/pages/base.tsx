import { jsxRenderer } from "hono/jsx-renderer";
import { Style } from "hono/css";
import Nav from "../components/nav";
import Loading from "../components/loading";
import { Suspense } from "hono/jsx";

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
          <script src="https://unpkg.com/htmx.org@1.9.10"></script>
          <script src="https://unpkg.com/htmx-ext-preload@2.1.0"></script>
          <Style />
        </head>
        <body hx-ext="preload">
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    );
  },
  { stream: true }
);
