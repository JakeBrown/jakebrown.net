type Post = {
  slug: string;
  content: string;
  metadata: PostMetadata;
};

type PostMetadata = {
  title: string;
  date: string;
};

export type { Post };

export default class Posts {
  kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

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
