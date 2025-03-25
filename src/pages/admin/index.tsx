import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import Posts from "../../kv/posts";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const posts = new Posts(ctx.env.blog);
  const postList = await posts.listPosts();
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
          <th>Published</th>
        </tr>
        {postList.map((post) => (
          <tr>
            <td>{post.metadata.title}</td>
            <td>
              <a href={`/admin/edit/${post.slug}`}>{post.slug}</a>
            </td>
            <td>{post.metadata.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
