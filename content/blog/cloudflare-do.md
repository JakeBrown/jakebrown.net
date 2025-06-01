---
title: "Using Cloudflare Durable Objects"
date: "2025-04-03"
tags: ["cloudflare"]
status: "published"
---

In the [previous post](/blog/cloudflare-kv) I explored using Cloudflare KV for managing blog content. While I didn't think the eventually consistent model would be a problem, it turned out that `list` and `get` were not consistent, which led to errors for a full minute after new content was published. This did have a familiar feeling - I mention in that post that I had seen framework adapters for Cloudflare Pages use KV for storing content, and I remember similar buggy behaviour following each deploy. 

Let's explore using Durable Objects instead...


---

## Durable Objects vs D1
I tried implementing this in both D1 and Durable Objects. D1 has the following advantages:

- Point in time rollback
- Web UI for viewing content
- Remote access to the DB via HTTP (for things like [Drizzle Kit/Studio](https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit)) 

Each of these are nice to have, but not impossible to work around. We lose all that using the (beta) SQLite in Durable Objects. But we gain:

- No manual steps required to deploy, a new DO - just add a couple of lines to your `wrangler.yaml`
- Sharding for multi-tenant architecture is built-in
- JS is guaranteed to execute alongside the database

Each of these is a huge win in my book. I'll touch on each of them below. 

## Leakproof Abstraction
A Durable Object looks something like this:

```typescript
/// <reference types="@cloudflare/workers-types" />
import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { like, desc, eq, isNotNull } from "drizzle-orm";
import { posts } from "./schema";
import { migrate } from "./migrations";

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

  async list(showAll: boolean = false) {
    if (showAll) {
      return this.db.select().from(posts).orderBy(desc(posts.date)).all();
    } else {
      return this.db
        .select()
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.date))
        .all();
    }
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
```

All instance methods of a class are guaranteed to run alongside the SQLite database:

> When a Durable Object uses SQLite, SQLite is invoked as a library. This means the database code runs not just on the same machine as the DO, not just in the same process, but in the very same thread. Latency is effectively zero, because there is no communication barrier between the application and SQLite. A query can complete in microseconds. - [link](https://blog.cloudflare.com/sqlite-in-durable-objects/). 

There is just no way to write code that makes a high-latency query to the database. This gives a leakproof abstraction. All database access code lives inside the class. Whether you use Drizzle ORM like I did, or write raw SQL, nothing outside of the DO needs to know. 

**In progress - more to come soon**

