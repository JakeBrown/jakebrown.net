import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import Posts from "../kv/posts";

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
        ul {
          padding-left: 0;
        }
        li {
          margin-left: 0px;
          text-decoration: none;
          list-style-type: none;
        }
        a {
          text-decoration: none;
        }
        span {
          color: var(--burnt-orange);
          font-size: 0.8em;
        }
      `}
    >
      <h1>Blog</h1>

      <p>
        Code snippets, conference notes, educational material and musings. I'm
        in the process of building this on Cloudflare KV, and moving content
        over from the previous system.
      </p>
      <ul>
        <h2>Posts</h2>

        {postList.map((post) => (
          <li>
            <a href={`/blog/${post.slug}`}>
              {post.metadata.title} <span>{post.metadata.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
