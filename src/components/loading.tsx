import { css } from "hono/css";

export default function Loading() {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 50vh;
      `}
    >
      <img
        className="dark:invert"
        src="/static/img/lightning.svg"
        alt="Loading logo"
        width={200}
        height={200}
        priority
      />
      <h2>Loading...</h2>
    </div>
  );
}
