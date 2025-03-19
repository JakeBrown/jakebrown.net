import { css } from "hono/css";

export default async function Page() {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <img class={css`
      width: 250px;
      height: 250px;
      align-self: center;
      box-shadow: 1px 1px 5px grey;
        `} src="/static/img/headshot.jpg" alt="Jake Brown" />
      <h1>Hello, friends!</h1>
      <p>
        My name is Jake Brown and I'm a software engineer from Adelaide,
        Australia. I do modern full-stack web development with an eye for
        scalable, well architected solutions.
      </p>
      <p>
        With extensive experience designing solutions for large
        multi-tenant application architectures on AWS, I'm also interested in exploring the new
        cloud-native internet built on Cloudflare.
      </p>
      <p>Thanks for dropping by!</p>
    </div>
  );
}
