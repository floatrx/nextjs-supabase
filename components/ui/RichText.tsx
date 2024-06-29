import Markdown from 'react-markdown';
// Code block syntax highlighting
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
// Language parsers
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
// Default theme
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils/cn';

const languageParserMap = {
  js: tsx,
  javascript: tsx,
  typescript: tsx,
  jsx: tsx,
  ts: tsx,
  tsx,
  json,
};

Object.entries(languageParserMap).forEach(([language, parser]) => {
  SyntaxHighlighter.registerLanguage(language, parser);
});

// Styles
export type RichTextProps = {
  content?: string;
  className?: string;
  excerpt?: boolean;
};

/**
 * Shared.RichText
 * Supports markdown, gfm, raw html
 * @relation StrapiSharedRichText
 * @param content - content to render
 * @param className - custom className
 * @param excerpt - limit content to 3 lines
 * @constructor
 */
export const RichText = ({ content, className, excerpt }: RichTextProps) => {
  if (!content) return null;

  // If excerpt is true, only allow p, a, strong, em, code elements
  const allowedElements = excerpt ? ['p', 'a', 'strong', 'em', 'code'] : undefined;

  return (
    <Markdown
      allowedElements={allowedElements}
      className={cn(className, 'prose max-w-[860px] dark:prose-invert lg:prose-2xl', excerpt && 'line-clamp-3')}
      components={{
        code(props) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { children, className, node, style, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');

          return match ? (
            <SyntaxHighlighter
              {...rest}
              showLineNumbers
              PreTag="div"
              customStyle={{ background: 'black' }}
              language={match[1]}
              lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
              style={dark}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      remarkRehypeOptions={{ allowDangerousHtml: true }}
    >
      {content}
    </Markdown>
  );
};
