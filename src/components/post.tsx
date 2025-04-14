import { css } from "hono/css";
import { posts } from "../db/schema";
import { render } from "../renderer";

function MoreLink({ slug }: { slug: string }) {
  return (
    <a
      class={css`
        background-color: var(--night-sky);
        font-family: oswald;
        letter-spacing: 0.05rem;
        color: white;
        padding: 10px;
        border-radius: 5px;
        float: right;
      `}
      href={`/blog/${slug}/`}
    >
      Read More
    </a>
  );
}

function MoreContent({ moreContent }: { moreContent: string }) {
  return <div dangerouslySetInnerHTML={{ __html: render(moreContent) }} />;
}

export default function PostView({
  post,
  showMore,
}: {
  post: typeof posts.$inferSelect;
  showMore: boolean;
}) {
  return (
    <div
      class={css`
        padding-bottom: 30px;
        margin-top: 2rem;
        h1 {
          margin-top: 0px;
          a {
            text-decoration: none;
            color: var(--burnt-orange);
          }
        }
        .date {
          font-size: 0.75rem;
          color: var(--burnt-orange);
          margin-top: 20px;
          font-family: oswald-dark;
        }

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
        .tag {
          background-color: var(--burnt-orange);
          color: var(--white);
          padding: 5px;
          border-radius: 5px;
          margin-right: 5px;
          text-decoration: none;
          font-family: oswald-dark;
          -webkit-mask-image: url("/static/img/grit.png");
          mask-image: url("/static/img/grit.png");
          &:hover {
            border: 1px solid var(--burnt-orange);
            margin-left: -1px;
          }
        }
      `}
    >
      <h1>
        <a href={`/blog/${post.slug}/`}>{post.title}</a>
      </h1>
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
      {showMore && post.moreContent && (
        <MoreContent moreContent={post.moreContent} />
      )}
      {!showMore && post.moreContent && <MoreLink slug={post.slug} />}
    </div>
  );
}
