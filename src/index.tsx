import { Hono, HonoRequest } from "hono";
import { basicAuth } from "hono/basic-auth";
import { base } from "./pages/base";
import { ComponentClass } from "hono/jsx";

import HomePage from "./pages/home";
import PastPage from "./pages/past";
import NowPage from "./pages/now";
import BlogPost from "./pages/blogpost";
import AdminPage from "./pages/admin/index";
import EditPost from "./pages/admin/edit";
import NewPost from "./pages/admin/new";
import { posts } from "./db/schema";
import DurableDatabase from "./db";

export { DurableDatabase };

type Variables = {
  name: ComponentClass;
};

const app = new Hono<{ Variables: Variables; Bindings: Env }>();

//app.use(appendTrailingSlash());
app.use(base);

app.use("/*", async (c, next) => {
  c.header("Cache-Control", "public, max-age=3600");
  await next();
});

app.use("/admin/*", async (c, next) => {
  c.header("Cache-Control", "no-store");
  const auth = basicAuth({
    username: "admin",
    password: c.env.PASSWORD,
  });
  return auth(c, next);
});

app.get("/", async (c) => {
  return c.render(<HomePage />);
});

app.get("/now", async (c) => {
  return c.render(<NowPage />);
});

app.get("/before", async (c) => {
  return c.render(<PastPage />);
});

app.get("/blog/:slug/:filename", async (c) => {
  const slug = c.req.param("slug");
  const filename = c.req.param("filename");
  const key = `${slug}/${filename}`;
  const object = await c.env.jakebrown_blog.get(key);

  if (object === null) {
    return new Response("Object Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});

app.get("/blog/:slug/", async (c) => {
  const slug = c.req.param("slug");
  const stub = DurableDatabase.getDefault(c.env);
  const post = await stub.get(slug);
  if (post.status === "draft") {
    console.log("this is draft");
    return c.text("Not published", 404);
  }
  console.log("rendering post");
  return c.render(<BlogPost post={post} />);
});

app.get("/admin", async (c) => {
  return c.render(<AdminPage />);
});

app.get("/admin/edit/:slug", async (c) => {
  return c.render(<EditPost />);
});

app.get("/admin/new", async (c) => {
  return c.render(<NewPost />);
});

async function parsePost(r: HonoRequest): Promise<typeof posts.$inferInsert> {
  const parsedBody = await r.parseBody();
  console.log(parsedBody);
  const { slug, title, date, introContent, moreContent, status, tags } =
    parsedBody as {
      slug: string;
      title: string;
      date: string;
      introContent: string;
      tags: string;
      moreContent: string;
      status: "draft" | "unlisted" | "published";
    };
  console.log("parsed tags", tags);
  const post = {
    slug,
    introContent,
    moreContent: moreContent || undefined,
    title,
    tags,
    date,
    status,
  };
  console.log("parsed post", post);
  return post;
}

app.post("/admin/hx-posts", async (c) => {
  try {
    const post = await parsePost(c.req);
    const stub = DurableDatabase.getDefault(c.env);
    await stub.insert(post);
    const res = c.text(`Post created: ${post.slug}`, 201);
    res.headers.set("hx-redirect", "/admin");
    return res;
  } catch (e: any) {
    console.log(e);
    return c.text(`Error: ${e.message}`, 400);
  }
});

app.put("/admin/hx-posts", async (c) => {
  try {
    const stub = DurableDatabase.getDefault(c.env);
    const updatedPost = await parsePost(c.req);
    await stub.update(updatedPost);
    const res = c.text(`Post updated: ${updatedPost.slug}`, 201);
    res.headers.set("hx-redirect", "/admin");
    return res;
  } catch (e: any) {
    console.log(e);
    return c.text(`Error: ${e.message}`, 400);
  }
});

export default app;
