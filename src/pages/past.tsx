export default async function Page() {
  return (
    <div class="main mx-auto">
      <h1>Past Projects</h1>
      <p>
        I've been developing software professionally for 15+ years. Here are
        some of the more interesting projects:
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
      <h2>
        EyeSpace<sup>&reg;</sup>
      </h2>
      <p>
        In 2012 I co-founded medical device manufacturing company EyeSpace
        <sup>&reg;</sup>, creating software to design and manufacture contact
        lenses with state-of-the-art numerical simulation and manufacturing
        techniques.
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
      <h2>Textbook App</h2>
      Worked with the author of{" "}
      <a href="https://www.elsevierhealth.com.au/contact-lenses-9780702071683.html?srsltid=AfmBOoqSlMUTHCViD8QrIvh36w3QuPxnjfErtbFIoXdOd7TVPJTPbuJR">
        <i>Contact Lenses, 6th Edition</i>
      </a>{" "}
      to develop an educational web app to accompany the textbook release.
    </div>
  );
}
