import { Spinner } from '@heroui/spinner';

/**
 * Markdown editor skeleton
 * @example:
 * const MdEditorLazy = dynamic(
 *   () => import('@/components/editor/MdEditor'),
 *   { ssr: false, loading: MarkdownEditorSkeleton },
 * );
 * @constructor
 */
export const MarkdownEditorSkeleton = () => (
  <div className="prose dark:prose-invert lg:prose-2xl pointer-events-none flex h-[378px] min-w-full flex-col gap-2 text-xl">
    <div className="stack text-muted-foreground h-[48px] rounded-xl border-2 px-4 text-[15px] opacity-90">
      <span className="stack pl-1 opacity-45">
        <Spinner color="current" size="sm" /> Loading toolbar...
      </span>
    </div>
    <div className="flex-1 rounded-xl border-2 p-4 pt-6 pb-4">
      <div className="h-full rounded-xl border-2 px-6">
        <div className="text-muted-foreground mt-6 text-[24px]">Write your text here...</div>
      </div>
    </div>
  </div>
);
