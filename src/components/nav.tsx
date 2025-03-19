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
          border-radius: 0.375rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
          text-decoration: none;
          color: black;
        `,
        currentPath === href
          ? css`
              background-color: var(--deep-sky);
              color: white;
            `
          : css`
              &:hover {
                background-color: var(--sky);
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
        background-color: var(--wheat);
      `}
    >
      <NavLink href="/" currentPath={currentPath}>
        Home
      </NavLink>
      <NavLink href="/past" currentPath={currentPath}>
        Past Projects
      </NavLink>
    </nav>
  );
}
