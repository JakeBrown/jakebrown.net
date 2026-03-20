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
      <span><i>Updated March 2026</i></span>

      <p>
        Living in Prahran, Melbourne. Consulting with{" "}
        <a href="https://windybit.co">Windy Bit</a>.
      </p>

      <p>
        Building <a href="https://forktree.app">Forktree</a> — an experiential
        environmental education platform for{" "}
        <a href="https://www.theforktreeproject.com">The Forktree Project</a>.
      </p>
    </div>
  );
}