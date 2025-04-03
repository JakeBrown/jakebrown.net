/// <reference types="@cloudflare/workers-types" />
import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { DurableObject } from "cloudflare:workers";
import { posts } from "./schema";
import { migrate } from "./migrations";
import { eq } from "drizzle-orm";
import { desc, isNotNull } from "drizzle-orm";
import { like } from "drizzle-orm";

export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};

export default class DurableDatabase extends DurableObject {
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase;

  static getDefault(env: Env) {
    const id = env.DurableDatabase.idFromName("default");
    const stub = env.DurableDatabase.get(id);
    return stub;
  }

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.storage = ctx.storage;
    this.db = drizzle(this.storage, { logger: false });
    ctx.blockConcurrencyWhile(async () => {
      await migrate(ctx.storage.sql);
    });
  }

  async insert(user: typeof posts.$inferInsert) {
    await this.db.insert(posts).values(user);
  }

  async update(post: typeof posts.$inferInsert) {
    await this.db
      .update(posts)
      .set(post)
      .where(eq(posts.slug, post.slug))
      .execute();
  }

  async list() {
    return this.db.select().from(posts).orderBy(desc(posts.date)).all();
  }

  async listWithTag(tag: string) {
    return this.db
      .select()
      .from(posts)
      .where(like(posts.tags, `%${tag}%`))
      .orderBy(desc(posts.date))
      .all();
  }

  async tags() {
    let tagsQuery = this.db
      .selectDistinct({ tags: posts.tags })
      .from(posts)
      .where(isNotNull(posts.tags))
      .all() as { tags: string }[];
    let tags = tagsQuery.map((tag) => tag.tags);
    // comma separate each tag in the tags column
    const allTags = tags.map((tag) => tag.replaceAll(" ", "").split(","));
    // flatten the array
    tags = allTags.flat();
    // remove duplicates
    tags = [...new Set(tags)];
    // Remove the empty tag, in case it made its way in
    tags = tags.filter((t) => t !== "");
    // remove the tag we are currently filtering by
    return tags;
  }

  async get(slug: string) {
    const post = this.db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .then(takeUniqueOrThrow);
    return post;
  }
}
