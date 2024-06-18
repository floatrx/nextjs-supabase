import type { TPostWithAuthor } from '@/types/post';

import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { PenBox } from 'lucide-react';

import { DeletePost } from '@/components/features/post/DeletePost';
import { getExcerpt, upperFirst } from '@/lib/string';

interface IProps {
  post: TPostWithAuthor;
}

export const PostCard: RC<IProps> = ({ post }) => {
  if (!post) return null;
  const { id, slug, created_at, title, content, thumbnail, author } = post;

  return (
    <article>
      <Card className="p-4">
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
              <DeletePost id={id} />
              <Button isIconOnly as={Link} href={`/blog/edit/${id}`} size="sm" variant="ghost">
                <PenBox size={18} />
              </Button>
            </div>
          </div>
          <div className="stack font-bold">
            <Avatar isBordered className="h-6 w-6 text-tiny" src={author?.avatar} />
            <span>{author?.username || author?.email}</span>
            <Chip className="ml-2" color="success" size="sm">
              {author?.role?.name}
            </Chip>
          </div>
          <Link className="text-2xl" href={`/blog/${slug}`}>
            {upperFirst(title)}
          </Link>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {thumbnail && <Image alt="thumbnail" className="aspect-auto w-full rounded-xl object-cover" src={thumbnail} />}
          <p className="pt-4">{getExcerpt(content)}</p>
        </CardBody>
      </Card>
    </article>
  );
};
