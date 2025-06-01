import { useMemo } from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Server-side markdown rendering function
function renderMarkdownOnServer(content: string): string {
  // Only import and use markdown-it on the server
  if (typeof window !== 'undefined') {
    // Client-side fallback - return pre-rendered HTML or basic content
    return content;
  }
  
  try {
    // Dynamic import to ensure this only runs on server
    const MarkdownIt = require('markdown-it');
    const md = new MarkdownIt({
      html: true,        // Enable HTML tags in source
      xhtmlOut: true,    // Use '/' to close single tags (<br />)
      breaks: true,      // Convert '\n' in paragraphs into <br>
      linkify: true,     // Autoconvert URL-like text to links
      typographer: true, // Enable some language-neutral replacement + quotes beautification
    });
    
    return md.render(content);
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return `<p>Error rendering markdown content</p>`;
  }
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const html = useMemo(() => {
    return renderMarkdownOnServer(content);
  }, [content]);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}