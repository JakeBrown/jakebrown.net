import { css } from "hono/css";

export default async function Page() {
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
        <h1>New Post</h1>

        <form
          hx-post="/admin/hx-posts"
          hx-trigger="submit"
          hx-target="#response"
          hx-swap="innerHTML"
          class={css`
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr 2fr;
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
          <input type="text" id="slug" name="slug" required />
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />

          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />

          <select id="status" name="status" required>
            <option value="draft">Draft</option>
            <option value="unlisted">Unlisted</option>
            <option value="published">Published</option>
          </select>

          <textarea id="content" name="content" rows={25} required></textarea>

          <div id="response"></div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
