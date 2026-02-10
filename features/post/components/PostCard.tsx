'use client';

import type { TPostExtended } from '@/types/post';

import Link from 'next/link';

import { DateTime } from '@/components/ui/DateTime';
import { StorageImage } from '@/components/ui/StorageImage';
import { DeletePostButton } from '@/features/post/components/DeletePostButton';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostAuthorInfo } from '@/features/post/components/PostAuthorInfo';
import { PostPreviewModal } from '@/features/post/components/PostPreviewModal';
import { PostTagsList } from '@/features/post/components/PostTagsList';
import { safePostExcerpt } from '@/features/post/lib/safePostExcerpt';
import { upperFirst } from '@/lib/utils/upperFirst';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { useDisclosure } from '@heroui/modal';

interface IProps {
  post: TPostExtended;
  currentUserId?: string;
}

export const PostCard: RC<IProps> = ({ post, currentUserId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!post) return null;

  const { id, slug, created_at, title, content, thumbnail, author } = post;
  const isOwner = currentUserId && author?.id === currentUserId;

  return (
    <article data-testid="post-card" id={`post-${id}`}>
      <Card className="bg-card h-full overflow-visible p-4 px-1">
        <CardHeader className="flex-col items-start gap-2 px-4 pt-2 pb-0">
          <StorageImage
            className="cursor-pointer"
            layoutId={`post-thumbnail-${slug}`}
            src={thumbnail}
            testId="post-thumbnail"
            onClick={onOpen}
          />
          <Link className="line-clamp-2 text-2xl" data-testid="post-title" href={`/blog/${slug}`}>
            {upperFirst(title)}
          </Link>
          <PostAuthorInfo author={author} />
          <DateTime className="text-muted-foreground text-sm" date={created_at} />
        </CardHeader>

        <CardBody className="overflow-visible py-1">
          <p className="line-clamp-4 pt-2">{safePostExcerpt(content)}</p>
        </CardBody>

        <CardFooter>
          <div className="flex-1 border-t-1 pt-3">
            <div className="stack justify-between">
              <PostTagsList onTagClick={onOpen} post={post} />
              {isOwner && (
                <div className="stack">
                  <DeletePostButton id={id} size="sm" variant="light" />
                  <EditPostButton id={id} size="sm" variant="light" />
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
      <PostPreviewModal isOpen={isOpen} post={post} onClose={onClose} />
    </article>
  );
};
