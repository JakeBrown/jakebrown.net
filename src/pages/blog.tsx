export default async function Page() {
  // Glob import all markdown files from 'posts' directory
  const posts = import.meta.glob("./posts/*.md");
  console.log(posts)

  return (
    <div class="main mx-auto">
      <h1>Blog</h1>
    </div>
  );
}
