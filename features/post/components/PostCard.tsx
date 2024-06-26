import type { TPostWithAuthor } from '@/types/post';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import Link from 'next/link';

import { OnlyAuthor } from '@/components/guards/OnlyAuthor';
import { DateTime } from '@/components/ui/DateTime';
import { StorageImage } from '@/components/ui/StorageImage';
import { DeletePostButton } from '@/features/post/components/DeletePostButton';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostAuthorAvatar } from '@/features/post/components/PostAuthorAvatar';
import { upperFirst, safePostExcerpt } from '@/lib/string';

interface IProps {
  post: TPostWithAuthor;
}

export const PostCard: RC<IProps> = ({ post }) => {
  if (!post) return null;
  const { id, slug, created_at, title, content, thumbnail, author } = post;

  return (
    <article id={`post-${id}`}>
      <Card className="h-full overflow-visible bg-card p-4 px-1">
        <CardHeader className="flex-col items-start gap-2 px-4 pb-0 pt-2">
          <StorageImage src={thumbnail} />
          <div className="stack w-full">
            <small className="text-default-500">
              <DateTime date={created_at} />
            </small>
            <span className="flex-1" />
            <div className="stack">
              <OnlyAuthor id={author?.id}>
                <DeletePostButton id={id} />
                <EditPostButton id={id} />
              </OnlyAuthor>
            </div>
          </div>
          <div className="stack font-bold">
            <PostAuthorAvatar author={author} />
            <span>{author?.username || author?.email}</span>
            <Chip className="ml-2" size="sm">
              {author?.role?.name}
            </Chip>
          </div>
          <Link className="line-clamp-2 text-2xl" href={`/blog/${slug}`}>
            {upperFirst(title)}
          </Link>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p className="line-clamp-5 pt-4">{safePostExcerpt(content)}</p>
        </CardBody>
      </Card>
    </article>
  );
};
