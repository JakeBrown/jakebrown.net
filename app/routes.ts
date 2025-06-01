import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("now", "routes/now.tsx"),
  route("past", "routes/past.tsx"),
  route("blog/:slug", "routes/post.tsx"),
] satisfies RouteConfig;
