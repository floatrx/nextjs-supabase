'use client';

import { useRouter } from 'next/navigation';

import { PostForm } from '@/components/features/post/PostForm';

export const CreatePostForm = () => {
  const router = useRouter();

  return (
    <PostForm
      onComplete={(post) => {
        if (!post) return;
        router.push(`/blog/${post.slug}`);
      }}
    />
  );
};
