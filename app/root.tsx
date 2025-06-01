import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useSearchParams,
} from "react-router";

import type { LinksFunction } from "react-router";
import globalStyles from "./global.css?url";

export const links: LinksFunction = () => [
  { rel: "preload", href: "/static/css/style.css", as: "style" },
  {
    rel: "preload",
    href: "/static/font/oswald-latin-500-normal.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/static/font/oswald-latin-300-normal.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/static/font/roboto-flex-latin-400-normal.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  { rel: "preload", href: "/static/img/logo_2.png", as: "image" },
  { rel: "preload", href: "/static/img/turb.svg", as: "image" },
  { rel: "stylesheet", href: "/static/css/style.css" },
  { rel: "stylesheet", href: "/static/css/night-owl.min.css", media: "print" },
  { rel: "stylesheet", href: globalStyles },
  { rel: "prefetch", href: "/", as: "document" },
  { rel: "prefetch", href: "/now", as: "document" },
  { rel: "prefetch", href: "/past", as: "document" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />

        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical styles for immediate rendering */
            :root {
              --night-sky: rgb(28, 42, 75);
              --wheat: rgb(230, 230, 200);
              --black: #121212;
              --lightblack: #333;
              --white: #f5f5f5;
              --burnt-orange: hsl(14, 68%, 42%);
            }
            
            @font-face {
              font-family: oswald-dark;
              src: url(/static/font/oswald-latin-500-normal.woff2);
              font-display: block;
            }
            
            @font-face {
              font-family: roboto;
              src: url(/static/font/roboto-flex-latin-400-normal.woff2);
              font-display: block;
            }
            
            html {
              color: var(--black);
              font-size: 17px;
              font-family: roboto, system-ui, sans-serif;
            }
            
            body {
              margin: 0;
              padding: 0;
              background-color: var(--white);
              min-height: 100vh;
              display: flex;
              flex-direction: column;
            }
            
            nav {
              display: flex;
              padding: 1rem;
              background-color: var(--night-sky);
              align-items: center;
            }
            
            nav a:not(#homelink):not(.github-link) {
              padding: 0.5rem 1rem;
              margin-right: 1rem;
              border-radius: 0.375rem;
              font-size: 1.5rem;
              line-height: 1.75rem;
              text-decoration: none;
              letter-spacing: 0.1rem;
              font-weight: 100;
              font-family: oswald-dark, system-ui, sans-serif;
              color: var(--wheat);
              transition: transform 0.05s ease;
            }
            
            nav a:not(#homelink):not(.github-link):hover:not([aria-current="page"]) {
              background-color: rgba(0, 0, 0, 0.3);
            }
            
            nav a:not(#homelink):not(.github-link):active {
              transform: scale(0.97) !important;
            }
            
            nav a[aria-current="page"] {
              background-color: var(--black);
            }
            
            nav a[aria-current="page"]:hover {
              background-color: var(--black) !important;
            }
            
            nav a[aria-current="page"]:active {
              transform: scale(0.97);
              background-color: var(--black) !important;
            }
            
            #homelink {
              padding: 0.5rem 1rem;
              margin-right: 1rem;
              text-decoration: none;
              display: flex;
              align-items: center;
              cursor: pointer;
              border-radius: 0.375rem;
              transition: transform 0.05s ease;
            }
            
            #homelink:hover:not([aria-current="page"]) {
              background-color: rgba(0, 0, 0, 0.3);
            }
            
            #homelink[aria-current="page"]:hover {
              background-color: var(--black) !important;
            }
            
            #homelink[aria-current="page"]:active {
              transform: scale(0.97);
              background-color: var(--black) !important;
            }
            
            #homelink:active {
              transform: scale(0.97) !important;
            }
            
            #homelink img {
              height: 40px;
              user-select: none;
              -webkit-user-drag: none;
              -moz-user-drag: none;
              -ms-user-drag: none;
              user-drag: none;
              pointer-events: none;
            }
            
            .github-link {
              margin-left: auto;
            }
            
            .github-link img {
              height: 1.5rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
            }
            
            main {
              padding-bottom: 50px;
            }
            
            @keyframes nav-shrink {
              from {
                transform: scale(1);
              }
              to {
                transform: scale(0.95);
              }
            }
            
            @keyframes nav-grow {
              from {
                transform: scale(0.95);
              }
              to {
                transform: scale(1);
              }
            }
            
            @keyframes slide-out {
              from {
                opacity: 1;
                transform: translateX(0) scale(1);
                background-color: var(--black);
              }
              to {
                opacity: 0;
                transform: translateX(-20px) scale(0.8);
                background-color: var(--black);
              }
            }
            
            @keyframes slide-in {
              from {
                opacity: 0;
                transform: translateX(20px) scale(0.8);
                background-color: var(--black);
              }
              to {
                opacity: 1;
                transform: translateX(0) scale(1);
                background-color: var(--black);
              }
            }
            
            @media (max-width: 768px) {
              nav {
                padding: 0.5rem;
              }
              nav a:not(#homelink):not(.github-link) {
                margin-right: 0.5rem;
                padding-left: 0.7rem;
                padding-right: 0.7rem;
              }
              #homelink {
                margin-right: 0.5rem;
              }
              .github-link {
                display: none;
              }
            }
          `,
          }}
        />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav>
      <Link
        to="/past"
        aria-current={currentPath === "/past" ? "page" : undefined}
        viewTransition
      >
        Before
      </Link>
      <Link
        to="/now"
        aria-current={currentPath === "/now" ? "page" : undefined}
        viewTransition
      >
        Now
      </Link>
      <Link
        to="/"
        id="homelink"
        aria-current={currentPath === "/" ? "page" : undefined}
        viewTransition
      >
        <img src="/static/img/logo_2.png" alt="Jake Brown" />
      </Link>
      <a
        href="https://github.com/JakeBrown/jakebrown.net"
        target="_blank"
        className="github-link"
      >
        <img src="/static/img/github-mark-white.svg" alt="GitHub Logo" />
      </a>
    </nav>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error - Jake Brown</title>
        <Links />
      </head>
      <body>
        <nav>
          <a href="/past">Before</a>
          <a href="/now">Now</a>
          <a href="/" id="homelink">
            <img src="/static/img/logo_2.png" alt="Jake Brown" />
          </a>
          <a
            href="https://github.com/JakeBrown/jakebrown.net"
            target="_blank"
            className="github-link"
          >
            <img src="/static/img/github-mark-white.svg" alt="GitHub Logo" />
          </a>
        </nav>
        <main style={{ padding: "2rem" }}>
          <h1>Oops! Something went wrong</h1>
          <p>We encountered an error while loading this page.</p>
          <a href="/">← Back to home</a>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

import { Component, ReactNode } from "react";

class RootErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Root error boundary caught:", error, errorInfo);
    console.error("Error stack:", error.stack);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundary />;
    }

    return this.props.children;
  }
}

export default function App() {
  return <Outlet />;
}
