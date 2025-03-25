import { css } from "hono/css";
import { Post } from "../kv/posts";
import markdownit from "markdown-it";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cssLang from "highlight.js/lib/languages/css";
import golang from "highlight.js/lib/languages/go";
import shell from "highlight.js/lib/languages/shell";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("css", cssLang);
hljs.registerLanguage("go", golang);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("json", json);

export default async function Page({ post }: { post: Post }) {
  const md = markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {
          console.log("error");
        }
      }
      return ""; // use external default escaping
    },
  });
  const content = md.render(post.content);
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <h1>{post.metadata.title}</h1>
      <span>{post.metadata.date}</span>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
