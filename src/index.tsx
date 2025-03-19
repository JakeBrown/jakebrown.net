import { Hono } from "hono";
import { base } from "./pages/base";
import { ComponentClass } from "hono/jsx";

import HomePage from "./pages/home";
import Past from "./pages/past";

type Variables = {
  name: ComponentClass;
};

const app = new Hono<{ Variables: Variables; Bindings: Env }>();

app.use(base);

app.get("/", async (c) => {
  return c.render(<HomePage />);
});

app.get("/past", async (c) => {
  return c.render(<Past />);
});


export default app;
