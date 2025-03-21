import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { base } from "./pages/base";
import { ComponentClass } from "hono/jsx";

import HomePage from "./pages/home";
import PastPage from "./pages/past";
import NowPage from "./pages/now";
import BlogPage from "./pages/blog";
import BlogPost from "./pages/blogpost";
import AdminPage from "./pages/admin/index";
import EditPost from "./pages/admin/editpost";
import Posts from "./kv/posts";
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
  return c.render(<BlogPost />);
});

app.get("/admin", async (c) => {
  return c.render(<AdminPage />);
});

app.get("/admin/edit/:slug", async (c) => {
  return c.render(<EditPost />);
});

app.post("/admin/api/posts", async (c) => {
  try {
    const { slug, title, date, tags, content } = (await c.req.parseBody()) as {
      slug: string;
      title: string;
      date: string;
      tags: string;
      content: string;
    };

    const post = {
      slug,
      content,
      metadata: {
        title,
        date,
        tags: tags.split(",").map((tag) => tag.trim()),
      },
    };

    const posts = new Posts(c.env.blog);
    await posts.addPost(post);

    const html = micromark(post.content);
    return c.html(html);
  } catch (e: any) {
    return c.text(`Error: ${e.message}`, 400);
  }
});

export default app;
