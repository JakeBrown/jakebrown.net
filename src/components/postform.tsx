import { css } from "hono/css";
import { posts } from "#src//db/schema.js";

export default async function PostForm({
  post,
}: {
  post?: typeof posts.$inferSelect;
}) {
  let hxAttributes: Record<string, string> = {
    "hx-target": "#response",
    "hx-trigger": "submit",
    "hx-target-error": "#error",
    "hx-swap": "innerHTML",
  };
  if (post) {
    hxAttributes["hx-put"] = "/admin/hx-posts";
  } else {
    hxAttributes["hx-post"] = "/admin/hx-posts";
  }

  return (
    <form
      {...hxAttributes}
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
      {post ? (
        <input
          type="text"
          id="slug"
          name="slug"
          value={post?.slug}
          readOnly
          style={{ cursor: "not-allowed" }}
        />
      ) : (
        <input type="text" id="slug" name="slug" required />
      )}
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" value={post?.title} required />

      <label htmlFor="date">Date</label>
      <input type="date" id="date" name="date" value={post?.date} required />

      <label htmlFor="status">Status</label>
      <select id="status" name="status" required>
        <option
          value="draft"
          selected={post?.status === "draft" ? true : false}
        >
          Draft
        </option>
        <option
          value="unlisted"
          selected={post?.status === "unlisted" ? true : false}
        >
          Unlisted
        </option>
        <option
          value="published"
          selected={post?.status === "published" ? true : false}
        >
          Published
        </option>
      </select>

      <label htmlFor="tags">Tags</label>
      <input id="tags" name="tags" type="text" value={post?.tags || ""}></input>

      <textarea id="introContent" name="introContent" rows={25} required>
        {post?.introContent}
      </textarea>

      <textarea id="moreContent" name="moreContent" rows={25}>
        {post?.moreContent}
      </textarea>
      <button type="submit">Save</button>
    </form>
  );
}
