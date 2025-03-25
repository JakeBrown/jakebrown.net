import { css } from "hono/css";
import { micromark } from "micromark";
import { Post } from "../kv/posts";

export default async function Page({ post }: { post: Post }) {
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
