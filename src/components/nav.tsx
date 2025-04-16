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
      href={href}
      class={cx(
        css`
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          padding-left: 1rem;
          padding-right: 1rem;
          margin-right: 1rem;
          border-radius: 0.375rem;
          font-size: 1.5rem;
          line-height: 1.75rem;
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
          text-decoration: none;
          letter-spacing: 0.1rem;
          font-weight: 100;
          font-family: oswald-dark;
          color: var(--wheat);
          position: relative;
          @media (max-width: 768px) {
            margin-right: 0.5rem;
            padding-left: 0.7rem;
            padding-right: 0.7rem;
          }
        `,
        currentPath === href
          ? css`
              background-color: var(--black);
            `
          : css`
              &:hover {
                background-color: var(--lightblack);
              }
            `,
        "grunge"
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
        @media (max-width: 768px) {
          padding: 0.5rem;
        }
      `}
    >
      <NavLink href="/before" currentPath={currentPath}>
        Before
      </NavLink>
      <NavLink href="/now" currentPath={currentPath}>
        Now
      </NavLink>
      <a
        href="/"
        id="homelink"
        class={css`
          padding-left: 1rem;
          border-left: 1px solid var(--wheat);
          padding-right: 1rem;
          margin-right: 1rem;
          text-decoration: none;
          display: flex;
          align-items: center;

          @media (max-width: 768px) {
            margin-left: auto;
          }
        `}
      >
        <img
          src="/static/img/logo_2.png"
          alt="Jake Brown"
          class={cx(css`
            height: 40px;
            align-self: center;
            padding-bottom: 0px;
            margin-bottom: 0px;
          `, 'grunge-heavy')}
        />
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
