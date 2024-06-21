'use client';

import { useRouter } from 'next/navigation';

import { PostForm, type IPostFormProps } from '@/components/features/post/PostForm';

export const EditPostForm: RC<IPostFormProps> = (props) => {
  const router = useRouter();

  return (
    <PostForm
      {...props}
      onComplete={({ data: post }) => {
        if (!post) return;
        router.push(`/blog/${post.slug}`);
      }}
    />
  );
};
