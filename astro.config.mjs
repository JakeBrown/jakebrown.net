import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

export default defineConfig({
  prefetch: true,
  integrations: [mdx()],
  output: "server",
  build: {
    assets: "_astro",
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
