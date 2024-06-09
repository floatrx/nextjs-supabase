import { useEffect, useRef, forwardRef } from 'react';
import { MDXEditor, type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor';

import { cn } from '@/lib/utils';
// Styles
import '@/styles/editor.css';
import '@mdxeditor/editor/style.css';
// Import all plugins
import { getMarkdownEditorPlugins } from '@/components/editor/editor.plugins';

interface IProps extends Omit<MDXEditorProps, 'markdown'> {
  value: string;
  mode?: 'default' | 'view';
  name?: string;
}

/**
 * Markdown Editor "MDXEditor" wrapper
 */
const MdEditor = forwardRef<MDXEditorMethods, IProps>(({ className, value = '', mode, ...props }, _) => {
  const editorRef = useRef<MDXEditorMethods | null>(null);
  const initialValue = useRef(value);

  // Compatibility with react-hook-form & ShadCN form
  useEffect(() => {
    if (!editorRef.current) return; // skip first render
    if (value === editorRef.current.getMarkdown()) return;
    editorRef.current?.setMarkdown(value); // sync value from parent form control
  }, [value]);

  return (
    <MDXEditor
      ref={editorRef}
      className={cn('dark-editor', className)}
      contentEditableClassName="prose dark:prose-invert lg:prose-2xl min-h-[250px]"
      markdown={value}
      placeholder="Write your text here..."
      plugins={getMarkdownEditorPlugins(mode, initialValue.current)}
      {...props}
    />
  );
});

// Display name requires forwardRef
MdEditor.displayName = 'MdEditor';

// For dynamic import
export default MdEditor;
