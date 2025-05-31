---
title: "Managing content in Cloudflare KV"
date: "2025-03-27"
tags: ["cloudflare"]
status: "published"
---

The easiest way of managing content for a developer blog is probably just Markdown files living in the repo. Frameworks like [Astro](https://docs.astro.build/en/guides/markdown-content/) come with support for this built-in, but it's trivial to do in any framework using Vite for the build process, with the built-in [glob import](https://vite.dev/guide/features#glob-import):

```javascript
const posts = import.meta.glob('./posts/*.md');
```

Which generates something that you can iterate over:


```javascript
{
  './posts/post1.md': () => import('./posts/post1.md'),
  './posts/post2.md': () => import('./posts/post2.md'),
  // ...
}
```

I'm exploring an approach on Cloudflare, and trying to avoid any build step (except for wranglers inbuilt esbuild). It's easy to include markdown files using [rules](https://developers.cloudflare.com/workers/wrangler/configuration/#inheritable-keys) and then import them directly in your worker, but it's not easy to list all the files for the index.

So instead of storing Markdown in the repo, I'm experimenting with using Cloudflare KV. I'm pretty sure many of the framework adapters for Workers used KV to store content before Cloudflare Pages and then [Workers Assets](https://developers.cloudflare.com/workers/static-assets/) came along, so it seems like a pretty standard option for that kind of thing.

---

Of course, since I can no longer just edit `md` files locally, I'll need to build a simple admin site to edit them. This is where something like `django admin` shines, but LLM's make it easy to generate that sort of thing, and they will only get better. I'll work on building this manually, so that I can use it as a reference for AI tools in the future. 

## KV API

Here are our types:

```typescript
type Post = {
  slug: string;
  content: string;
  metadata: PostMetadata;
};

type PostMetadata = {
  title: string;
  status: "draft" | "unlisted" | "published";
  date: string;
};
```

For creating and updating, we create two different functions so that we don't accidentally overwrite a previous post if we use a blog slug we've used before:


```typescript
  async addPost(post: Post): Promise<Post> {
    if (await this.kv.get(post.slug)) {
      throw new Error("Post title already exists");
    }
    this.kv.put(post.slug, post.content, { metadata: post.metadata });
    return post;
  }

  async updatePost(post: Post): Promise<Post> {
    if (await this.kv.get(post.slug)) {
      this.kv.put(post.slug, post.content, { metadata: post.metadata });
      return post;
    } else {
      throw new Error("Post not found");
    }
  }
```

Then we just need a way of getting and listing posts

```typescript
  async getPost(slug: string): Promise<Post> {
    const kvResult = await this.kv.getWithMetadata(slug);
    if (kvResult === null) {
      throw new Error("Post name not found");
    }
    const metadata = kvResult.metadata as PostMetadata | null;
    if (!metadata) {
      throw new Error("Post metadata not found");
    }

    if (!kvResult.value) {
      throw new Error("Post content not found");
    }

    const post = {
      slug: slug,
      metadata: metadata,
      content: kvResult.value,
    };
    return post;
  }

  async listPosts(): Promise<{ slug: string; metadata: PostMetadata }[]> {
    const { keys } = await this.kv.list();
    var posts = keys.flatMap((key) => {
      let metadata = key.metadata as PostMetadata | null;
      if (!metadata) {
        console.error(`No metadata found for ${key.name}`);
        return [];
      }
      return [
        {
          slug: key.name,
          metadata: metadata,
        },
      ];
    });
    // Sort by date
    posts = posts.sort((a, b) => {
      return a.metadata.date.localeCompare(b.metadata.date);
    });
    posts = posts.reverse();
    return posts;
  }
}
```

That should be all we need until we want to introduce tagging and searching. 


## Eventual Consistency

One gotcha with KV is the [eventually consistent](https://developers.cloudflare.com/kv/concepts/how-kv-works/#consistency) model. Will that cause problems? Let's look at some concrete cases:

```typescript
put("key1", "new content")
```

Followed by calling `get` several times might result in:

```javascript
get("key1")
    -> "old content"
get("key1")
    -> "old content"
get("key1")
    -> "new content"
```

So it might take a few seconds (or up to 60) for everyone to see the new content. Not a big deal. But what about this:

```typescript
list()
    -> ["key1"]

put("key2", "more new content")

list()
    -> ["key1", "key2"]

get("key2")
    -> Error("Post content not found")
get("key2")
    -> Error("Post content not found")
get("key2")
    -> "more new content"
```

Perhaps unexpectedly, `list` and `get` return inconsistent results. It's easy to imagine this causing a bug where you click on a link to view the post, but it errors out. But is that theoretical and rare, or pretty common in practice?

Well I tried it, and it happens every time: calls to the `list` api return updated data long before calls to the `get` API. This means that when a post is published to the blog, it appears on the home page list almost immediately, and for a full minute the link returns a 404 page. A possible solution will be to enforce an order and a delay between the different statuses:

```typescript
  status: "draft" | "unlisted" | "published";
```

If we change from "draft" to "unlisted" it will ensure that the page is available via direct link, but not listed on the index. We then bump it to "published" a minute later. This could be automated via [Workflows](https://developers.cloudflare.com/workflows/). 

There's also some problems with the Admin UI. Eventual consistency might be fine for a blog, but it's not suitable for the editing experience. If the `save` button triggers a page reload, then you will be shown an older version of the content, and have to keep refreshing for a full minute before you see your changes. I have a feeling that Durable Objects will be the answer for this - since it doesn't need fast global access, the admin site can write to a DO and which can then store it to KV for the main site to read. 

More to come on these solutions in [Part 2](/blog/cloudflare-do).

