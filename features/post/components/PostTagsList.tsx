import type { TPostExtended } from '@/types/post';

import Link from 'next/link';

import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { AddTagDropdown } from '@/features/post/components/AddTagDropdown';
import { RemovePostTag } from '@/features/post/components/RemovePostTag';
import { TagItem, type TagItemProps } from '@/features/tag/components/TagItem';
import { cn } from '@/lib/utils/cn';

interface IProps extends Omit<TagItemProps, 'tag'> {
  post: TPostExtended;
  interactive?: boolean;
  wrapperClassName?: string;
  onTagClick?: () => void;
}

export const PostTagsList: RC<IProps> = ({ post, interactive, wrapperClassName, onTagClick, ...tagProps }) => {
  const { author } = post;
  const tags = post?.tags.map(({ tag }) => tag!) || [];
  const tagIds = tags.map((tag) => tag.id);

  return (
    <div className={cn('stack flex-wrap items-center gap-2', wrapperClassName)}>
      {!tags.length && interactive && <span className="stack text-muted-foreground">Add Tag</span>}
      {tags.map((tag) => {
        const tagElement = (
          <TagItem
            actions={
              interactive && (
                <OnlyAuth userId={author?.id}>
                  <RemovePostTag className="-mr-2" postId={post.id} tagId={tag.id} />
                </OnlyAuth>
              )
            }
            interactive={interactive}
            size="md"
            tag={tag}
            variant={interactive ? 'light' : 'plain'}
            {...tagProps}
          />
        );

        // When onTagClick is provided, clicking opens preview instead of navigating
        if (onTagClick) {
          return (
            <button key={tag.id} className="stack cursor-pointer" type="button" onClick={onTagClick}>
              {tagElement}
            </button>
          );
        }

        return (
          <Link key={tag.id} className="stack" href={`/tags/${tag.name}`}>
            {tagElement}
          </Link>
        );
      })}
      {interactive && (
        <OnlyAuth userId={author?.id}>
          <AddTagDropdown
            buttonProps={{ className: 'text-muted-foreground hover:text-foreground' }}
            postId={post.id}
            skipTags={tagIds}
          />
        </OnlyAuth>
      )}
    </div>
  );
};
