import { useRequestContext } from "hono/jsx-renderer";
import { css, cx } from "hono/css";

function NavLink({
  href,
  currentPath,
  children,
}: {
  href: string;
  currentPath: string;
  children: string;
}) {
  return (
    <a
      preload="mouseover"
      href={href}
      class={cx(
        css`
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          padding-left: 1rem;
          padding-right: 1rem;
          margin-right: 1rem;
          border-radius: 0.375rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
          text-decoration: none;
          color: white;
        `,
        currentPath === href
          ? css`
              background-color: var(--black);
              color: var(--wheat);
            `
          : css`
              &:hover {
                background-color: var(--lightblack);
                color: white;
              }
            `
      )}
    >
      {children}
    </a>
  );
}

export default function Nav() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const currentPath = new URL(ctx.req.url).pathname;
  return (
    <nav
      class={css`
        display: flex;
        padding: 1rem;
        background-color: var(--night-sky);
        font-family: "Fira Code";
        @media (max-width: 768px) {
          padding: 0.5rem;
        }
      `}
    >
      <NavLink href="/now" currentPath={currentPath}>
        Now
      </NavLink>
      <NavLink href="/past" currentPath={currentPath}>
        Past
      </NavLink>
      <a
        href="/"
        class={css`
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          padding-left: 1rem;
          border-left: 1px solid var(--wheat);
          padding-right: 1rem;
          margin-right: 1rem;
          font-size: 1.25rem;
          font-weight: 900;
          line-height: 1.75rem;
          color: var(--wheat);
          text-decoration: none;
          font-family: "Fira Code";
          @media (max-width: 768px) {
            font-weight: 300;
            margin-right: 0rem;
          }
        `}
      >
        Jake Brown
      </a>

      <a
        style="margin-left: auto;"
        href="https://github.com/JakeBrown/jakebrown.net"
        target="_blank"
        class={css`
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <img
          style="
          height: 1.5rem;          
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          "
          src="/static/img/github-mark-white.svg"
          alt="GitHub Logo"
          height="40"
        />
      </a>
    </nav>
  );
}
