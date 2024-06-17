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
  <div className="prose flex h-[372px] min-w-full flex-col gap-2 text-xl dark:prose-invert lg:prose-2xl">
    <div className="stack h-[46px] rounded-lg border px-4 text-[15px] text-muted-foreground opacity-60">MDXEditor</div>
    <div className="flex-1 rounded-lg border p-4 py-6">
      <div className="h-full rounded-lg border px-6">
        <div className="mt-6 text-[24px] text-muted-foreground">
          <Spinner size="sm" /> Loading... Please, wait!
        </div>
      </div>
    </div>
  </div>
);
