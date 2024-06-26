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
}

export const PostTagsList: RC<IProps> = ({ post, interactive, wrapperClassName, ...tagProps }) => {
  const { author } = post;
  const tags = post?.tags.map(({ tag }) => tag!) || [];
  const tagIds = tags.map((tag) => tag.id);

  return (
    <div className={cn('flex flex-wrap', wrapperClassName)}>
      {tags.length === 0 && interactive && <span className="stack text-muted-foreground">Add post tags</span>}
      {tags.map((tag) => (
        // TODO: Tags could be non-interactive
        <Link key={tag.id} className="stack" href={`/tags/${tag.name}`}>
          <TagItem
            actions={
              interactive && (
                <OnlyAuth idUser={author?.id}>
                  <RemovePostTag className="-mr-2" idPost={post.id} idTag={tag.id} />
                </OnlyAuth>
              )
            }
            interactive={interactive}
            size="md"
            tag={tag}
            variant={interactive ? 'light' : 'plain'}
            {...tagProps}
          />
        </Link>
      ))}
      {interactive && (
        <OnlyAuth idUser={author?.id}>
          <AddTagDropdown
            buttonProps={{ className: 'text-muted-foreground hover:text-foreground' }}
            idPost={post.id}
            skipTags={tagIds}
          />
        </OnlyAuth>
      )}
    </div>
  );
};
