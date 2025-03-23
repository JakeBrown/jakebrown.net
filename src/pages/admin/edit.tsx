import Posts from "#src//kv/posts.js";
import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const slug = ctx.req.param("slug");
  const posts = new Posts(ctx.env.blog);
  const post = await posts.getPost(slug);

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

        <form
          hx-put="/admin/hx-posts"
          hx-trigger="submit"
          hx-target="#response"
          hx-swap="innerHTML"
          class={css`
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr;
            label {
              align-self: center;
              text-align: right;
            }
            input {
              margin: 0px;
              font-size: 0.75rem;
              line-height: 1rem;
              padding: 5px;
            }
            textarea {
              margin: 0px;
              font-size: 0.75rem;
              line-height: 1rem;
            }
            label[for="content"],
            textarea[name="content"] {
              grid-column: 1 / -1;
            }

            #response {
              grid-column: 1 / -1;
            }
          `}
        >
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={post.slug}
            readOnly
            style={{ cursor: "not-allowed" }}
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post?.metadata.title}
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={post?.metadata.date}
            required
          />

          <textarea id="content" name="content" rows={25} required>
            {post?.content}
          </textarea>

          <div id="response"></div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
