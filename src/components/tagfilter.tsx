import { css } from "hono/css";

export default async function TagFilter({
  tag,
  tags,
}: {
  tag: string;
  tags: string[];
}) {
  return (
    <div
      class={css`
        border: 2px solid var(--night-sky);
        box-shadow: 5px 5px 5px var(--night-sky);
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 30px;
        background-color: var(--white);

        h1 {
          margin-top: 0px;
          display: flex; /* Use flexbox for alignment */
          align-items: center; /* Vertically center content */

          @media (max-width: 768px) {
            line-height: 1;
            font-size: 1.5em;
          }
        }

        position: relative;

        .close-btn {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 24px;
          height: 24px;
          line-height: 1;
          border-radius: 5px;
          background-color: var(--night-sky);
          color: var(--white);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          font-size: 18px;
          font-weight: bold;
          border: none;
        }

        .tag {
          background-color: var(--burnt-orange);
          color: var(--white);
          padding: 5px;
          border-radius: 5px;
          margin-right: 5px;
          text-decoration: none;
          font-family: oswald-dark;

          font-size: 0.5em;
          line-height: 1; /* Vertically center content */
          padding: 8px;
          margin-left: 10px;

          -webkit-mask-image: url("/static/img/grit.png");
          mask-image: url("/static/img/grit.png");
        }

        a {
          text-decoration: none;
        }

        .othertag {
          background-color: var(--night-sky);
          color: var(--white);
          padding: 5px;
          border-radius: 5px;
          margin-right: 5px;
          text-decoration: none;
          font-family: oswald-dark;
          -webkit-mask-image: url("/static/img/grit.png");
          mask-image: url("/static/img/grit.png");
          &:hover {
            border: 1px solid var(--night-sky);
            margin-right: 4px;
            margin-left: -1px;
          }
        }

        @media (max-width: 768px) {
          .othertag {
            font-size: 0.8em;
          }
        }
      `}
    >
      <a href="/" class="close-btn">
        &times;
      </a>
      <h1>
        Showing: <span class="tag">{tag}</span>
      </h1>
      <div
        class={css`
          display: inline-block;
        `}
      >
        {tags.map((tag) => (
          <a href={`/?tag=${tag}`}>
            <span class="othertag">{tag}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
