import { Spinner } from '@nextui-org/spinner';

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
  <div className="prose pointer-events-none flex h-[378px] min-w-full flex-col gap-2 text-xl dark:prose-invert lg:prose-2xl">
    <div className="stack h-[48px] rounded-xl border-2 px-4 text-[15px] text-muted-foreground opacity-90">
      <span className="stack pl-1 opacity-45">
        <Spinner color="current" size="sm" /> Loading toolbar...
      </span>
    </div>
    <div className="flex-1 rounded-xl border-2 p-4 pb-4 pt-6">
      <div className="h-full rounded-xl border-2 px-6">
        <div className="mt-6 text-[24px] text-muted-foreground">Write your text here...</div>
      </div>
    </div>
  </div>
);
