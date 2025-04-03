import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import DurableDatabase from "../../db";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const stub = DurableDatabase.getDefault(ctx.env);
  const slug = ctx.req.param("slug");
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
        <h1>Edit Post New</h1>

        <form
          hx-put="/admin/hx-posts"
          hx-trigger="submit"
          hx-target="#response"
          hx-target-error="#error"
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
            input[type="checkbox"] {
              align-self: center;
            }
            textarea {
              margin: 0px;
              font-size: 0.75rem;
              line-height: 1rem;
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
            value={post.title}
            required
          />

          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={post.date} required />

          <label htmlFor="status">Status</label>
          <select id="status" name="status" required>
            <option
              value="draft"
              selected={post.status === "draft" ? true : false}
            >
              Draft
            </option>
            <option
              value="unlisted"
              selected={post.status === "unlisted" ? true : false}
            >
              Unlisted
            </option>
            <option
              value="published"
              selected={post.status === "published" ? true : false}
            >
              Published
            </option>
          </select>

          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={post.tags || ""}
          ></input>

          <textarea id="introContent" name="introContent" rows={25} required>
            {post.introContent}
          </textarea>

          <textarea id="moreContent" name="moreContent" rows={25}>
            {post.moreContent}
          </textarea>
          <button type="submit">Save</button>
        </form>
        <div id="error"></div>
        <div id="response"></div>
      </div>
    </div>
  );
}
