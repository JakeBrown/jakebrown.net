import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { getBlogPostBySlug } from "../lib/blog-posts";
import MarkdownIt from 'markdown-it';

// Create markdown-it instance
const md = new MarkdownIt({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,    // Use '/' to close single tags (<br />)
  breaks: true,      // Convert '\n' in paragraphs into <br>
  linkify: true,     // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
});

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [{ title: "Post Not Found - Jake Brown" }];
  }

  return [
    { title: `${data.post.frontmatter.title} - Jake Brown` },
    {
      name: "description",
      content: `Blog post: ${data.post.frontmatter.title}`,
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  // Render markdown on the server
  const contentHtml = md.render(post.content);

  return { 
    post: {
      ...post,
      contentHtml,
      content: undefined // Don't send raw markdown to client
    }
  };
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <article className="blog-post">
      <h1>{post.frontmatter.title}</h1>
      <div className="tags">
        {post.frontmatter.tags.map((tag) => (
          <Link key={tag} to={`/?tag=${tag}`}>
            <span className="tag grunge">{tag}</span>
          </Link>
        ))}
      </div>
      <div className="date">
        <span>{post.frontmatter.date}</span>
      </div>
      <div 
        className="content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
