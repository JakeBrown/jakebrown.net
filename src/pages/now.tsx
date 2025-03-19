import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const posts = await ctx.env.ASSETS.fetch("static/posts/git.md");
  //console.log(posts)
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <h1>Now</h1>
      <p>My Now page</p>

      <br />
    </div>
  );
}
