import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
export const posts = sqliteTable("posts", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  slug: text().notNull(),
  title: text().notNull(),
  status: text({ enum: ["draft", "unlisted", "published"] }).notNull(),
  date: text().notNull(),
  introContent: text().notNull(),
  moreContent: text(),
  tags: text(), // Comma separated, spaces should be stripped out when using
});

export type Post = typeof posts.$inferSelect;
