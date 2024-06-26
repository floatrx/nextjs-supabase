'use client';

import { useRouter } from 'next/navigation';

import { PostForm } from '@/features/post/components/PostForm';

export const CreatePostForm = () => {
  const router = useRouter();

  return (
    <PostForm
      onComplete={({ data: post, ...rest }) => {
        console.log('[CreatePostForm] redirecting: ', post, rest);
        if (!post) return;
        router.push(`/blog/${post.slug}`);
      }}
    />
  );
};