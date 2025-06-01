// Server-only markdown rendering
import MarkdownIt from 'markdown-it';

// Create markdown-it instance
const md = new MarkdownIt({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,    // Use '/' to close single tags (<br />)
  breaks: true,      // Convert '\n' in paragraphs into <br>
  linkify: true,     // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
});

export function renderMarkdown(content: string): string {
  try {
    return md.render(content);
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return `<p>Error rendering markdown content</p>`;
  }
}