'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { createPost } from '@/features/post/actions/createPost';
import { PostForm } from '@/features/post/components/PostForm';

export const CreatePostForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <PostForm
      loading={isPending}
      onSubmit={(values) => {
        startTransition(async () => {
          const [post] = await createPost(values);

          if (!post?.data) return;
          router.push(`/blog/${post.data.slug}`);
        });
      }}
    />
  );
};
