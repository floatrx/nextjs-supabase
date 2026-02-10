import type { TPostExtended } from '@/types/post';

import { DateTime } from '@/components/ui/DateTime';
import { Dot } from '@/components/ui/Dot';
import { Heading } from '@/components/ui/layout/headings/Heading';
import { RichText } from '@/components/ui/RichText';
import { StorageImage } from '@/components/ui/StorageImage';
import { PostAuthorInfo } from '@/features/post/components/PostAuthorInfo';
import { PostTagsList } from '@/features/post/components/PostTagsList';
import { upperFirst } from '@/lib/utils/upperFirst';

interface IProps {
  post: TPostExtended;
  layoutId?: string;
  showContent?: boolean;
  className?: string;
  interactiveTags?: boolean;
}

/**
 * Reusable article content component used in both detail page and preview modal
 */
export const PostArticle: RC<IProps> = ({ post, layoutId, showContent = true, className, interactiveTags = true }) => {
  const { slug, title, content, thumbnail, author, created_at } = post;

  return (
    <article className={className}>
      <header className="space-y-6">
        <StorageImage
          className="-mt-10 mb-6 rounded-lg shadow-2xl"
          layoutId={layoutId ?? `post-thumbnail-${slug}`}
          src={thumbnail}
        />
        <Heading>
          <span>{upperFirst(title)}</span>
        </Heading>

        <div className="stack text-muted-foreground flex-wrap gap-2 gap-y-0 text-sm text-nowrap sm:text-lg">
          <PostAuthorInfo author={author} />
          <Dot />
          <DateTime date={created_at} />
        </div>

        <hr />
        <PostTagsList interactive={interactiveTags} post={post} size="lg" variant="flat" wrapperClassName="gap-4" />
      </header>

      {showContent && (
        <main className="article-content mt-5">
          <RichText content={content} />
        </main>
      )}
    </article>
  );
};
