import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import { Post, posts } from "../db/schema";
import { render } from "../renderer";

export default async function Page() {
  const ctx = useRequestContext<{ Bindings: Env }>();
  const showCount = 10;

  const id: DurableObjectId = ctx.env.DurableDatabase.idFromName("default");
  const stub = ctx.env.DurableDatabase.get(id);

  const tag = ctx.req.query("tag");
  let tags: string[] = await stub.tags();
  tags = tags.filter((t) => t !== tag);

  let postList: (typeof posts.$inferSelect)[];

  if (tag === undefined) {
    postList = await stub.list();
  } else {
    postList = await stub.listWithTag(tag);
  }

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
        .tag {
          background-color: var(--burnt-orange);
          color: white;
          padding: 5px;
          border-radius: 5px;
          margin-right: 5px;
          text-decoration: none;
        }
        .othertag {
          background-color: var(--night-sky);
          color: white;
          padding: 5px;
          border-radius: 5px;
          margin-right: 5px;
          text-decoration: none;
        }
      `}
    >
      {tag && (
        <div
          class={css`
            border: 2px solid var(--night-sky);
            box-shadow: 5px 5px 5px var(--night-sky);
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 30px;
            h1 {
              margin-top: 0px;
              display: flex; /* Use flexbox for alignment */
              align-items: center; /* Vertically center content */
              .tag {
                font-size: 0.5em;
                line-height: 1; /* Vertically center content */
                padding: 8px;
                margin-left: 10px;
              }

              @media (max-width: 768px) {
                line-height: 1;
                font-size: 1.5em;
              }
            }

            position: relative;

            .close-btn {
              position: absolute;
              top: 3px;
              right: 3px;
              width: 24px;
              height: 24px;
              line-height: 1;
              border-radius: 5px;
              background-color: var(--night-sky);
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              font-size: 18px;
              font-weight: bold;
              border: none;
            }

            @media (max-width: 768px) {
              .othertag {
                font-size: 0.8em;
              }
            }
          `}
        >
          <a href="/" class="close-btn">
            &times;
          </a>
          <h1>
            Showing: <span class="tag">{tag}</span>
          </h1>
          <div
            class={css`
              display: inline-block;
            `}
          >
            {tags.map((tag) => (
              <a href={`/?tag=${tag}`}>
                <span class="othertag">{tag}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      {postList.slice(0, showCount).map((post) => (
        <div
          class={css`
            border-bottom: 2px solid var(--night-sky);
            h1 {
              margin-top: 0px;
            }
            margin-bottom: 20px;
            padding-bottom: 30px;
            .date {
              font-size: 0.75rem;
              color: var(--burnt-orange);
              margin-top: 20px;
            }
          `}
        >
          <a href={`/blog/${post.slug}/`}>
            <h1>{post.title}</h1>
          </a>
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
          <div
            dangerouslySetInnerHTML={{ __html: render(post.introContent) }}
          />
          {post.moreContent && (
            <a
              class={css`
                background-color: var(--night-sky);
                color: white;
                padding: 10px;
                border-radius: 5px;
                float: right;
              `}
              href={`/blog/${post.slug}/`}
            >
              Read More
            </a>
          )}
        </div>
      ))}
      {postList.length > showCount && (
        <div class={css``}>
          <h2>More Posts</h2>
          <ul>
            {postList.slice(showCount).map((post) => (
              <li>
                <a href={`/blog/${post.slug}/`}>
                  {post.title}{" "}
                  <span
                    class={css`
                      font-size: 0.75rem;
                      color: var(--burnt-orange);
                    `}
                  >
                    {post.date}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
