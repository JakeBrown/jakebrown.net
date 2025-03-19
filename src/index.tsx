import { Hono } from "hono";
import { base } from "./pages/base";
import { ComponentClass } from "hono/jsx";

import HomePage from "./pages/home";
import NowPage from "./pages/now";
import BlogPage from "./pages/blog";

type Variables = {
  name: ComponentClass;
};

const app = new Hono<{ Variables: Variables; Bindings: Env }>();

app.use(base);

app.get("/", async (c) => {
  return c.render(<HomePage />);
});

app.get("/now", async (c) => {
  return c.render(<NowPage />);
});

app.get("/blog", async (c) => {
  return c.render(<BlogPage />);
});

export default app;
