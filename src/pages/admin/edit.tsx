import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import DurableDatabase from "../../db";
import PostForm from "#src//components/postform.js";
import { html } from "hono/html";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const slug = ctx.req.param("slug");
  const stub = DurableDatabase.getDefault(ctx.env);
  const post = await stub.get(slug);

  const listOptions = {
    prefix: slug,
  };
  const objects = (await ctx.env.jakebrown_blog.list(listOptions)).objects;

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

        <h2>Attachments</h2>
        <ul
          className={css`
            list-style-type: none;
            padding-left: 0px;
          `}
        >
          {objects.map((obj) => {
            return (
              <li
                className={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 5px;
                  border-bottom: 1px solid var(--wheat);
                  margin-bottom: 5px;
                  &:last-child {
                    border-bottom: none;
                  }
                `}
                key={obj.key}
              >
                {obj.key}
              </li>
            );
          })}
        </ul>
        <h2>Upload New Attachment</h2>
        <form
          id="form"
          hx-encoding="multipart/form-data"
          hx-post={`/blog/${slug}/upload`}
        >
          <input type="file" name="file" />
          <button>Upload</button>
          <progress id="progress" value="0" max="100"></progress>
        </form>

        <div id="error"></div>
        <div id="response"></div>
      </div>
      {html`
        <script>
          htmx.on('#form', 'htmx:xhr:progress', function(evt){" "}
          {htmx
            .find("#progress")
            .setAttribute("value", (evt.detail.loaded / evt.detail.total) * 100)}
          );
        </script>
      `}
    </div>
  );
}
