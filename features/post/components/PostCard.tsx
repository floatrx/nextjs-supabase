import type { TPostExtended } from '@/types/post';

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import Link from 'next/link';

import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { DateTime } from '@/components/ui/DateTime';
import { StorageImage } from '@/components/ui/StorageImage';
import { DeletePostButton } from '@/features/post/components/DeletePostButton';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostAuthorInfo } from '@/features/post/components/PostAuthorInfo';
import { PostTagsList } from '@/features/post/components/PostTagsList';
import { safePostExcerpt } from '@/features/post/lib/safePostExcerpt';
import { upperFirst } from '@/lib/utils/upperFirst';

interface IProps {
  post: TPostExtended;
}

export const PostCard: RC<IProps> = ({ post }) => {
  if (!post) return null;

  const { id, slug, created_at, title, content, thumbnail, author } = post;

  return (
    <article id={`post-${id}`}>
      <Card className="h-full overflow-visible bg-card p-4 px-1">
        <CardHeader className="flex-col items-start gap-2 px-4 pb-0 pt-2">
          <StorageImage src={thumbnail} />
          <Link className="line-clamp-2 text-2xl" href={`/blog/${slug}`}>
            {upperFirst(title)}
          </Link>
          <PostAuthorInfo author={author} />
          <DateTime className="text-sm text-muted-foreground" date={created_at} />
        </CardHeader>

        <CardBody className="overflow-visible py-1">
          <p className="line-clamp-4 pt-2">{safePostExcerpt(content)}</p>
        </CardBody>

        <CardFooter>
          <div className="flex-1 border-t-1 pt-3">
            <div className="stack justify-between">
              <PostTagsList post={post} />
              <OnlyAuth userId={author?.id}>
                <div className="stack">
                  <DeletePostButton id={id} size="sm" variant="light" />
                  <EditPostButton id={id} size="sm" variant="light" />
                </div>
              </OnlyAuth>
            </div>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};
