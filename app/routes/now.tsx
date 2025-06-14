import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Now - Jake Brown" },
    { name: "description", content: "What Jake Brown is doing now" },
  ];
};

export default function Now() {
  return (
    <div className="content">
      <h1>Now</h1>
      <span><i>Updated Friday 21 March 2025</i></span>

      <p>
        I'm living on the Fleurieu Peninsula in South Australia and currently
        interested in exploring the possibilities of a new type of edge-native
        internet built on Cloudflare.
      </p>

      <h2>Cloudflare</h2>
      <p>
        What does full-stack application development look like on Cloudflare, in
        the most platform-native way? No build step, no server, no external
        database. Just a worker script running on the edge and utilising using
        Cloudflare services.
      </p>
      <p>
        Very different to building on anything else. I've often thought of it
        like this: in the traditional cloud model, big fat pipes connect large
        data centers to each other and to the end users. Servers running in
        those data centers do the compute. But with Cloudflare, there are no
        servers (in this abstraction), and the compute happens inside the pipes.
      </p>
      <blockquote>
        With the addition of Workers KV, Cloudflare Workers moves closer to
        being a complete{" "}
        <mark>compute platform embedded inside the Internet</mark>. -{" "}
        <a href="https://blog.cloudflare.com/introducing-workers-kv/">
          Introducing Workers KV (2018)
        </a>
      </blockquote>

      <p>
        You can find the source for this site on GitHub. It is built using React Router 7,
        and deployed to Cloudflare Workers.
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
        It's looking a little Mad Max, but should look a little friendlier once
        some windows go in.
      </p>

      <img src="/static/img/truck.jpeg" alt="Truck" />
    </div>
  );
}