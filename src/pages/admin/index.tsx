import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import DurableDatabase from "../../db";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const stub = DurableDatabase.getDefault(ctx.env);
  const postList = await stub.list();
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;

        .new-button {
          padding: 0.5rem 1rem;
          margin: 0.5rem;
          font-size: 1rem;
          line-height: 1.5rem;
          border: none;
          border-radius: 0.25rem;
          text-decoration: none;
          width: 100px;
          text-align: center;
          background-color: var(--blue);
          color: var(--white);
          cursor: pointer;
        }
      `}
    >
      <h1>Admin UI</h1>
      <a class="new-button" href="/admin/new">
        New Post
      </a>

      <h2>Edit Posts</h2>
      <table class={css``}>
        <tr>
          <th>Title</th>
          <th>Slug</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
        {postList.map((post) => (
          <tr>
            <td>{post.title}</td>
            <td>
              <a href={`/admin/edit/${post.slug}`}>{post.slug}</a>
            </td>
            <td>{post.status}</td>
            <td>{post.tags}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
