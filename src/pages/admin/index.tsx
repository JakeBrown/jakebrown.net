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
      `}
    >
      <h1>Admin UI</h1>

      <h2>Edit Posts</h2>
      {postList.map((post) => (
        <a href={`/admin/edit/${post.slug}`}>{post.metadata.title}</a>
      ))}
    </div>
  );
}
