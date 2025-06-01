import { useMemo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';

interface MDXContentProps {
  compiledContent: string;
}

export function MDXContent({ compiledContent }: MDXContentProps) {
  const Component = useMemo(() => {
    if (!compiledContent) return () => null;
    
    try {
      const scope = { ...runtime };
      const fn = new Function('scope', compiledContent);
      return fn(scope).default;
    } catch (error) {
      console.error('Error rendering MDX:', error);
      return () => <div>Error rendering content</div>;
    }
  }, [compiledContent]);

  return (
    <MDXProvider>
      <Component />
    </MDXProvider>
  );
}