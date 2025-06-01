import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Past - Jake Brown" },
    { name: "description", content: "Jake Brown's professional background" },
  ];
};

export default function Past() {
  return (
    <div className="content">
      <h1 className="grunge-heavy">Before Now</h1>
      <p>
        I've been developing software professionally for 15+ years. Here is how
        I've spent the bulk of my time.
      </p>
      <h2>Academic Research</h2>
      <p>
        In 2012 I completed my studies in{" "}
        <a href="https://calendar.adelaide.edu.au/aprcw/2024/hschp_hschp">
          High Performance Computational Physics
        </a>
        ; basically a cross between Mathematical Physics and Computer Science.
        In my research project I worked on optimising large scale inversion
        problems, breaking down masivelly parallel FORTRAN code to run in
        parallel on Hadoop on AWS.
      </p>
      <p>
        While moving into private industry after my four year honours degree, I
        continued to work on Machine Learning research projects, and guest
        lectured to postgrad students on the topic of Software Architecture.
      </p>
      <h2 className="grunge-heavy">
        EyeSpace<sup>&reg;</sup>
      </h2>
      <p>
        In 2012 I co-founded medical device manufacturing company EyeSpace,
        creating software to design and manufacture contact lenses with
        state-of-the-art numerical simulation and manufacturing techniques.
      </p>
      <p>
        As Managing Director and then Chief Technology Officer, I grew the
        company and led our team of developers building secure and maintainable
        software to facilitate the work of our manufacturers and doctors around
        the world.
      </p>
      <p>
        You can read more about the product at{" "}
        <a href="https://www.eye.space">www.eye.space</a>. Here are some of the
        technologies we used:
      </p>
      <ul>
        <li>Numerical computing and machine control in Python</li>
        <li>
          Large desktop application built in Java, developed and maintained for
          14+ years
        </li>
        <li>
          Web applications built in Python/Flask and eventually ported to
          SvelteKit
        </li>
        <li>Microservices in Golang, Python, TypeScript</li>
        <li>Container orchestration on GCP with Kubernetes</li>
        <li>Serverless workflows for data processing on AWS</li>
      </ul>
      <p>
        I also worked with the author of{" "}
        <a href="https://www.elsevierhealth.com.au/contact-lenses-9780702071683.html?srsltid=AfmBOoqSlMUTHCViD8QrIvh36w3QuPxnjfErtbFIoXdOd7TVPJTPbuJR">
          <i>Contact Lenses, 6th Edition</i>
        </a>{" "}
        to develop an educational web app to accompany the textbook release.
      </p>
      <div className="images">
        <img src="/static/img/contact-lenses-textbook.jpg" alt="textbook" />
        <img src="/static/img/textbook-app.jpg" alt="app" />
      </div>
      <h2>AI, Machine Learning, and Evolutionary Computing</h2>
      <p>
        The large and interesting data-sets we were working with at EyeSpace
        <sup>&reg;</sup> led me to explore modern computing techniques for both
        exploratory data analysis and inferential modelling. Internally and with
        external collaborators at the University of Adelaide.
      </p>
      <p>
        From analysing corneal data to extrapolate corneal height, through to
        LLM based analysis of clinical notes.
      </p>
    </div>
  );
}