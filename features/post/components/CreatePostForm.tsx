'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { createPost } from '@/features/post/actions/createPost';
import { PostForm } from '@/features/post/components/PostForm';
import { useServerAction } from '@/hooks/useServerAction';

export const CreatePostForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { execute } = useServerAction(createPost);

  return (
    <PostForm
      loading={isPending}
      onSubmit={(values) => {
        startTransition(async () => {
          const post = await execute(values);

          if (!post?.data) return;
          router.push(`/blog/${post.data.slug}`);
        });
      }}
    />
  );
};
