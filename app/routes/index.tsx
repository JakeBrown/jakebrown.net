import { Suspense } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Form, Link, useLoaderData } from "react-router";
import { getAllTags, getPublishedPosts } from "../lib/blog-posts";
import MarkdownIt from 'markdown-it';

// Client-only wrapper for Suspense
const ClientOnlySuspense =
  typeof window !== "undefined"
    ? Suspense
    : ({ children }: any) => <>{children}</>;

// Shared filter box component
interface FilterBoxProps {
  title: string;
  children: React.ReactNode;
}

function FilterBox({ title, children }: FilterBoxProps) {
  return (
    <div className="filter-box">
      <Link to="/" className="close-button">
        ×
      </Link>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Create markdown-it instance
const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

export const meta: MetaFunction = () => {
  return [
    { title: "Jake Brown" },
    { name: "description", content: "Jake Brown - Software Engineer" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const posts = getPublishedPosts();
  const allTags = getAllTags();

  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag");
  const searchQuery = url.searchParams.get("q")?.toLowerCase() || "";
  const showSearchBox = url.searchParams.has("search");

  let filteredPosts = posts;

  // Apply tag filter
  if (selectedTag) {
    filteredPosts = filteredPosts.filter((post) => post.frontmatter.tags.includes(selectedTag));
  }

  // Apply search filter
  if (searchQuery) {
    filteredPosts = filteredPosts.filter((post) => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(searchQuery);
      const contentMatch = post.content.toLowerCase().includes(searchQuery);
      return titleMatch || contentMatch;
    });
  }

  // Render markdown previews on the server with search highlighting
  const postsWithHtml = filteredPosts.map(post => {
    let previewHtml = md.render(post.preview);
    
    // Highlight search terms if present
    if (searchQuery) {
      const searchTerms = searchQuery.split(/\s+/).filter(term => term.length > 0);
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        previewHtml = previewHtml.replace(regex, '<mark>$1</mark>');
      });
    }

    return {
      ...post,
      previewHtml,
      preview: undefined, // Don't send raw markdown to client
    };
  });

  return {
    posts: postsWithHtml,
    allTags,
    selectedTag,
    searchQuery,
    showSearchBox,
    showCount: 10,
  };
}

export default function Index() {
  const { posts, allTags, selectedTag, searchQuery, showSearchBox, showCount } =
    useLoaderData<typeof loader>();

  const recentPosts = selectedTag || searchQuery ? posts : posts.slice(0, showCount);
  const morePosts = selectedTag || searchQuery ? [] : posts.slice(showCount);

  return (
    <div>
      {searchQuery && (
        <FilterBox title="Search results">
          <Form action="/" method="get" className="search-form">
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search posts..."
              className="search-input"
              autoFocus
            />
            <button type="submit" className="search-button">Search</button>
          </Form>
          <p className="search-results-count">
            Found {posts.length} {posts.length === 1 ? 'post' : 'posts'} matching "{searchQuery}"
          </p>
        </FilterBox>
      )}

      {selectedTag && (
        <FilterBox title="Filter by tag">
          <div className="all-tags">
            <div className="tags">
              {allTags.map((tag) =>
                tag === selectedTag ? (
                  <span key={tag} className="tag grunge selected-tag">
                    {tag}
                  </span>
                ) : (
                  <Link key={tag} to={`/?tag=${encodeURIComponent(tag)}`}>
                    <span className="tag grunge">{tag}</span>
                  </Link>
                )
              )}
            </div>
          </div>
        </FilterBox>
      )}

      {/* Search toggle button - positioned top right */}
      {!searchQuery && !selectedTag && !showSearchBox && (
        <Link 
          to="/?search"
          className="search-icon-button"
          aria-label="Open search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Link>
      )}

      {/* Search box - styled like tag filter */}
      {showSearchBox && !searchQuery && !selectedTag && (
        <FilterBox title="Search posts">
          <Form action="/" method="get" className="search-form">
            <input
              type="text"
              name="q"
              placeholder="Search posts..."
              className="search-input"
              autoFocus
            />
            <button type="submit" className="search-button">Search</button>
          </Form>
        </FilterBox>
      )}

      <div className="posts">
        {recentPosts.length === 0 && searchQuery && (
          <div className="no-results">
            <p>No posts found matching "{searchQuery}"</p>
            <p>Try searching with different keywords or <Link to="/">browse all posts</Link>.</p>
          </div>
        )}
        {recentPosts.map((post) => {
          // Highlight search terms in title if searching
          let titleElement = <>{post.frontmatter.title}</>;
          if (searchQuery) {
            const searchTerms = searchQuery.split(/\s+/).filter(term => term.length > 0);
            let titleHtml = post.frontmatter.title;
            searchTerms.forEach(term => {
              const regex = new RegExp(`(${term})`, 'gi');
              titleHtml = titleHtml.replace(regex, '<mark>$1</mark>');
            });
            titleElement = <span dangerouslySetInnerHTML={{ __html: titleHtml }} />;
          }

          return (
            <article key={post.slug} className="post-preview">
              <h2>
                <Link to={`/blog/${post.slug}`}>{titleElement}</Link>
              </h2>
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="tags">
                  {post.frontmatter.tags.map((tag) => (
                    <Link key={tag} to={`/?tag=${encodeURIComponent(tag)}`}>
                      <span className="tag grunge">{tag}</span>
                    </Link>
                  ))}
                </div>
              )}
              <div className="date">{post.frontmatter.date}</div>
              <div className="intro">
                <div
                  className="preview-content"
                  data-has-break={post.hasPageBreak ? "true" : "false"}
                  dangerouslySetInnerHTML={{ __html: post.previewHtml }}
                />
                {post.hasPageBreak && (
                  <div className="read-more">
                    <Link to={`/blog/${post.slug}`} className="read-more-btn">
                      Read more
                    </Link>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {morePosts.length > 0 && (
        <div className="more-posts">
          <h2>More Posts</h2>
          <ul>
            {morePosts.map((post) => (
              <li key={post.slug}>
                <a href={`/blog/${post.slug}`}>
                  {post.frontmatter.title}{" "}
                  <span className="date-small">{post.frontmatter.date}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
