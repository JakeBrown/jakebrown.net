import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import { micromark } from "micromark";
import Posts from "../kv/posts";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const slug = ctx.req.param("post");
  const posts = new Posts(ctx.env.blog);
  const post = await posts.getPost(slug);
  const content = micromark(post.content);

  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <h1>{post.metadata.title}</h1>
      <span>{post.metadata.date}</span>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
