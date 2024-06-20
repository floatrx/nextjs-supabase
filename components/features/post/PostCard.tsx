import type { TPostWithAuthor } from '@/types/post';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Image } from '@nextui-org/image';
import Link from 'next/link';

import { DeletePostButton } from '@/components/features/post/DeletePostButton';
import { EditPostButton } from '@/components/features/post/EditPostButton';
import { PostAuthorAvatar } from '@/components/features/post/PostAuthorAvatar';
import { upperFirst, safePostExcerpt } from '@/lib/string';

interface IProps {
  post: TPostWithAuthor;
}

export const PostCard: RC<IProps> = ({ post }) => {
  if (!post) return null;
  const { id, slug, created_at, title, content, thumbnail, author } = post;

  return (
    <article>
      <Card className="h-full p-4">
        <CardHeader className="flex-col items-start gap-2 px-4 pb-0 pt-2">
          <div className="stack w-full">
            <small className="text-default-500">
              {new Date(created_at ?? '').toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
            <span className="flex-1" />
            <div className="stack">
              <DeletePostButton id={id} />
              <EditPostButton id={id} />
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
          {thumbnail && <Image alt="thumbnail" className="aspect-auto w-full rounded-xl object-cover" src={thumbnail} />}
          <p className="line-clamp-5 pt-4">{safePostExcerpt(content)}</p>
        </CardBody>
      </Card>
    </article>
  );
};
