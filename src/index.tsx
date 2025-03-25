import { Hono, HonoRequest } from "hono";
import { basicAuth } from "hono/basic-auth";
import { base } from "./pages/base";
import { ComponentClass } from "hono/jsx";

import HomePage from "./pages/home";
import PastPage from "./pages/past";
import NowPage from "./pages/now";
import BlogPage from "./pages/blog";
import BlogPost from "./pages/blogpost";
import AdminPage from "./pages/admin/index";
import EditPost from "./pages/admin/edit";
import NewPost from "./pages/admin/new";
import Posts, { Post } from "./kv/posts";
import { micromark } from "micromark";

type Variables = {
  name: ComponentClass;
};

const app = new Hono<{ Variables: Variables; Bindings: Env }>();

app.use(base);

app.use("/admin/*", async (c, next) => {
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

app.get("/past", async (c) => {
  return c.render(<PastPage />);
});

app.get("/blog", async (c) => {
  return c.render(<BlogPage />);
});

app.get("/blog/:slug", async (c) => {
  const slug = c.req.param("slug");
  console.log("loading post", slug);
  const posts = new Posts(c.env.blog);
  const post = await posts.getPost(slug);
  if (post.metadata.status == "draft") {
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

async function parsePost(r: HonoRequest): Promise<Post> {
  const parsedBody = await r.parseBody();
  const { slug, title, date, content, status } = parsedBody as {
    slug: string;
    title: string;
    date: string;
    content: string;
    status: "draft" | "unlisted" | "published";
  };
  const post = {
    slug,
    content,
    metadata: {
      title,
      date,
      status,
    },
  };
  return post;
}

app.post("/admin/hx-posts", async (c) => {
  try {
    const post = await parsePost(c.req);
    const posts = new Posts(c.env.blog);
    await posts.addPost(post);
    const res = c.text(`Post created: ${post.slug}`, 201);
    res.headers.set("hx-redirect", "/admin");
    return res;
  } catch (e: any) {
    return c.text(`Error: ${e.message}`, 400);
  }
});

app.put("/admin/hx-posts", async (c) => {
  try {
    const post = await parsePost(c.req);
    const posts = new Posts(c.env.blog);
    await posts.updatePost(post);
    const res = c.text(`Post updated: ${post.slug}`, 201);
    res.headers.set("hx-redirect", "/admin");
    return res;
  } catch (e: any) {
    return c.text(`Error: ${e.message}`, 400);
  }
});

export default app;
