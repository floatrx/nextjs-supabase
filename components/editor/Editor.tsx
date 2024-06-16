import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import { MarkdownEditorSkeleton } from './EditorSkeleton';

interface IProps {
  errorMessage?: string;
  onChange: (value: string) => void;
  value: string;
}

// Lazy load MarkdownEditor
const MdEditorLazy = dynamic(
  () => import('@/components/editor/MdEditor'),
  // Disable SSR for this component, use skeleton instead
  { ssr: false, loading: MarkdownEditorSkeleton },
);

export const Editor = forwardRef<HTMLTextAreaElement, IProps>(({ errorMessage, ...props }, textareaRef) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(e.target.value);
  };

  return (
    <div>
      <MdEditorLazy {...props} ref={null} />
      <textarea ref={textareaRef} hidden readOnly {...props} onChange={handleTextareaChange} />
      {!!errorMessage && <p className="m-0 border text-danger">{errorMessage}</p>}
    </div>
  );
});

Editor.displayName = 'Editor';
