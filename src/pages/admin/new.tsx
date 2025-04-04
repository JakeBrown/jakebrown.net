import PostForm from "#src//components/postform.js";
import { css } from "hono/css";

export default async function Page() {
  return (
    <div>
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          width: 100%;
          h1 {
            margin-top: 0px;
          }
        `}
      >
        <h1>New Post</h1>
        <PostForm />

        <div id="error"></div>
        <div id="response"></div>
      </div>
    </div>
  );
}
