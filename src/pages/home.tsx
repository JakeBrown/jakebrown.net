import { css } from "hono/css";
import { useRequestContext } from "hono/jsx-renderer";
import { posts } from "../db/schema";
import TagFilter from "../components/tagfilter";
import PostView from "../components/post";

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
      `}
    >
      {tag && <TagFilter tag={tag} tags={tags} />}
      {postList.slice(0, showCount).map((post) => (
        <div
          class={css`
            box-shadow: 0 3px 2px -2px gray;
            margin-bottom: 50px;
            padding-bottom: 20px;
          `}
        >
          <PostView post={post} showMore={false} />
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
