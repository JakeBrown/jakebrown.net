import { css } from "hono/css";

export default async function Page() {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <h1>Jake Brown</h1>
    </div>
  );
}
