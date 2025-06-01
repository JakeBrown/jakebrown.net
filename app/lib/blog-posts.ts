// Lightweight frontmatter parser for Cloudflare Workers
function parseFrontmatter(content: string): { data: any; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatterStr, mainContent] = match;
  const data: any = {};

  // Parse YAML-like frontmatter (simplified)
  frontmatterStr.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Handle arrays (tags)
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/['"]/g, ""));
    }
    // Remove quotes from strings
    else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  });

  return { data, content: mainContent };
}

// Import all markdown files as raw text
const modules = import.meta.glob<string>("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Only log in development
if (typeof window !== "undefined" && import.meta.env.DEV) {
  console.log("Loaded modules:", Object.keys(modules));
}

export interface BlogPost {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    status?: "draft" | "unlisted" | "published";
  };
  preview: string;
  hasPageBreak: boolean;
}

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, content]) => {
    const filename = path.split("/").pop()?.replace(".md", "") || "";
    const { data: frontmatter, content: markdownContent } =
      parseFrontmatter(content);

    // Check for page break
    const hasPageBreak = markdownContent.includes("\n---\n");
    let preview = markdownContent;

    if (hasPageBreak) {
      preview = markdownContent.split("\n---\n")[0];
    }

    return {
      slug: filename,
      content: markdownContent.replace("\n---\n", "\n"),
      frontmatter: {
        title: frontmatter.title || filename,
        date: frontmatter.date || "",
        tags: frontmatter.tags || [],
        status: frontmatter.status || "published",
      },
      preview,
      hasPageBreak,
    };
  })
  .filter((post) => post.slug !== "");

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter(
      (post) =>
        post.frontmatter.status !== "draft" &&
        post.frontmatter.status !== "unlisted"
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    (post.frontmatter.tags || []).forEach((tag) => {
      if (!tag) return; // Skip empty tags
      tags.add(tag);
    });
  });
  return Array.from(tags).sort();
}
