import type { MdEditorProps } from '@/components/ui/editor/MdEditor';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import { MarkdownEditorSkeleton } from './EditorSkeleton';

interface IProps extends Pick<MdEditorProps, 'value' | 'onChange'> {
  errorMessage?: string;
}

// Lazy load MarkdownEditor
const MdEditorLazy = dynamic(
  () => import('@/components/ui/editor/MdEditor'),
  // Disable SSR for this component, use skeleton instead
  { ssr: false, loading: MarkdownEditorSkeleton },
);

/**
 * Markdown editor wrapper with textarea for server-actions (FormData);
 * Features:
 * - Lazy load
 * - Skeleton
 * - Error message
 * - Full compatibility with react-hook-form
 * @example:
 * <Controller control={control} name="content" render={({ field }) =>
 *    <Editor errorMessage={errors.content?.message} {...field} />} />
 */
export const Editor = forwardRef<HTMLTextAreaElement, IProps>(({ errorMessage, ...props }, forwardedRef) => (
  <>
    <MdEditorLazy {...props} ref={null} />
    <textarea
      ref={forwardedRef} // forwarded ref is required for controller
      hidden
      readOnly
      {...props} // pass all props from parent controller wrapper
      // override default onChange event
      onChange={(e) => props.onChange?.(e.target.value)}
    />
    {!!errorMessage && <p className="m-0 text-danger">{errorMessage}</p>}
  </>
));

Editor.displayName = 'Editor';
