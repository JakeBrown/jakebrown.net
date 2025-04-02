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
      <span>
        <i>Updated Friday 21 March 2025</i>
      </span>

      <p>
        I'm living on the Fleurieu Peninsula in South Australia and currently
        interested in exploring the possibilities of a new type of edge-native
        internet built on Cloudflare.
      </p>

      <h2>Cloudflare</h2>
      <p>
        I'm currently exploring what full-stack application development looks
        like on Cloudflare, in the most platform-native way. No build step, no
        server, no external database. Just a worker script running on the edge
        and utilising using Cloudflare services.
      </p>
      <p>
        It's different to building on anything else. I've often thought of it
        like this: in the traditional cloud model, big fat pipes connect large
        data centers to each other and to the end users. Servers running in
        those data centers do the compute. But with Cloudflare, there are no
        servers (in this abstraction), and the compute happens inside the pipes.
      </p>
      <div class="quote">
        <p>
          <q>
            With the addition of Workers KV, Cloudflare Workers moves closer to
            being a complete{" "}
            <mark>compute platform embedded inside the Internet</mark>.
          </q>
        </p>
        <p>
          <a href="https://blog.cloudflare.com/introducing-workers-kv/">
            Introducing Workers KV (2018)
          </a>
        </p>

        <p>
          You can find the source for this site on GitHub. It is built using
          Hono, and deployed to Cloudflare Workers.
        </p>
      </div>
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
          width: 90%;
          max-width: 600px;
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
