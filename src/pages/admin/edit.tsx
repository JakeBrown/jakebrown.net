import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import DurableDatabase from "../../db";
import PostForm from "#src//components/postform.js";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const slug = ctx.req.param("slug");
  const stub = DurableDatabase.getDefault(ctx.env);
  const post = await stub.get(slug);

  return (
    <div>
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          width: 100%;
          h1 {
            margin-top: 0px;
          }
        `}
      >
        <h1>Edit Post</h1>
        <PostForm post={post} />

        <div id="error"></div>
        <div id="response"></div>
      </div>
    </div>
  );
}
