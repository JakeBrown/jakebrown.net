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
      <h1>Now</h1>
      <h2>Cloudflare</h2>
      <p>
        I'm currently exploring what full-stack application development looks
        like on Cloudflare, in the most platform-native way. No build step, no
        server, no external database. Just a worker script running on the edge
        and utilising using Cloudflare services.
      </p>
      <h2>Consulting</h2>
      <p>
        After moving on from EyeSpace, I'm now consulting as a Solutions
        Architect, helping companies design and scale their cloud applications.
      </p>
      <p>
        Please get in contact via email (jake@ this domain) if you are keen to
        work together.
      </p>
      <h2>The Truck</h2>
      <p>
        The old canopy has gone and the electronics (fridge, inverter, hot water
        system etc) are all laid out in the horse stables. Finally putting my
        welding skills to the test on the truck itself, framing and cladding the
        hab unit.
      </p>

      <p>
        It's looking a little Mad Max, but should look a little frendlier once
        some windows go in.
      </p>

      <img
        class={css`
          height: 500px;
          align-self: center;
          box-shadow: 1px 1px 5px grey;
        `}
        src="/static/img/truck.jpeg"
        alt="Truck"
      />
      <p></p>
    </div>
  );
}
