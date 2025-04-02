import { css } from "hono/css";
import type { Post } from "../db/schema";
import { render } from "../renderer";

export default async function Page({ post }: { post: Post }) {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
          max-width: 50%;
          margin: auto;
          display: block;
          border: 1px solid black;
        }
        blockquote {
          border-left: 5px solid var(--burnt-orange);
          padding-left: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
          margin-left: 0px;
        }

        .date {
          font-size: 0.75rem;
          color: var(--burnt-orange);
          margin-top: 20px;
        }
      `}
    >
      <h1>{post.title}</h1>
      <div
        class={css`
          a {
            .tag {
              background-color: var(--burnt-orange);
              color: white;
              padding: 5px;
              border-radius: 5px;
              margin-right: 5px;
            }

            text-decoration: none;
          }
        `}
      >
        {post.tags &&
          post.tags
            .replaceAll(" ", "")
            .split(",")
            .map((tag) => (
              <a href={`/?tag=${tag}`}>
                <span class="tag">{tag}</span>
              </a>
            ))}
      </div>
      <div class="date">
        <span>{post.date}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: render(post.introContent) }} />
      {post.moreContent && (
        <div dangerouslySetInnerHTML={{ __html: render(post.moreContent) }} />
      )}
    </div>
  );
}
