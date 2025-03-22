import Posts from "#src//kv/posts.js";
import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import { micromark } from "micromark";

export default async function AdminPage() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const slug = ctx.req.param("slug");
  const posts = new Posts(ctx.env.blog);
  const post = await posts.getPost(slug);
  const content = micromark(post.content);

  return (
    <div>
      <div
        className={css`
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 10px;
          width: 100%;
          .column {
          }
          .preview-column {
            border: 1px solid grey;
            padding-left: 10px;
            background-color: white;
            padding: 10px;
            .preview-title {
              margin-top: 0px;
              text-decoration: underline;
              color: red;
            }
          }
        `}
      >
        <div class="column">
          <form
            hx-post="/admin/api/posts"
            hx-trigger="submit"
            hx-target="#response"
            hx-swap="innerHTML"
            class={css`
              display: grid;
              gap: 10px;
              grid-template-columns: 1fr 3fr;
              label {
                align-self: center;
              }
              input {
                margin: 0px;
              }
              textarea {
                margin: 0px;
                height: 300px;
                overflow-y: scroll;
                font-size: 0.75rem;
                line-height: 1rem;
              }
              label[for="content"],
              textarea[name="content"] {
                grid-column: 1 / -1;
              }
            `}
          >
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              readonly
              value={slug}
              style="cursor: not-allowed"
            />

            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.metadata.title}
              required
            />

            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={post.metadata.date}
              required
            />

            <label htmlFor="tags">Tags (comma-separated)</label>
            <input type="text" id="tags" name="tags" />

            <textarea id="content" name="content" rows={5} required>
              {post.content}
            </textarea>

            <button type="submit">Save</button>
          </form>
        </div>
        <div class="column preview-column">
          <h2 class="preview-title">Preview</h2>
          <div
            id="response"
            className={css`
              overflow-y: scroll;
            `}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </div>
  );
}
