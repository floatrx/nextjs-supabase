'use client';

import { useRouter } from 'next/navigation';

import { PostForm } from '@/components/features/post/PostForm';

export const CreatePostForm = () => {
  const router = useRouter();

  return (
    <PostForm
      onComplete={({ data: post, ...rest }) => {
        console.log('Redirecting to post slug: ', post, rest);
        if (!post) return;
        router.push(`/blog/${post.slug}`);
      }}
    />
  );
};
