import { css } from "hono/css";

export default async function Page() {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0px;
        @media (max-width: 768px) {
          margin: 50px;
          flex-direction: column;
        }
      `}
    >
      <div
        class={css`
          flex: 1;
          margin-right: 20px;
          @media (max-width: 768px) {
            margin-right: 0;
            margin-bottom: 20px;
          }
        `}
      >
        <h1>Hello, friends!</h1>
        <p>
          I'm a software engineer living on the Fleurieu Peninsula in South Australia.
        </p>
        <p>
          I have a background in numerical computing, and extensive experience designing solutions for large multi-tenant
          applications on AWS and GCP. I'm currently interested in exploring the possibilities of a
          new type of edge-native internet built on Cloudflare.
        </p>

      </div>
      <img
        class={css`
          height: 200px;
          box-shadow: 1px 1px 5px grey;
          align-self: center;
          @media (min-width: 768px) {
            margin-left: 50px;
          }
        `}
        src="/static/img/headshot.jpg"
        alt="Jake Brown"
      />
    </div>
  );
}
