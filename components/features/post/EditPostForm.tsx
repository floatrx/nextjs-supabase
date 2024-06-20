'use client';

import { useRouter } from 'next/navigation';

import { PostForm, type IPostFormProps } from '@/components/features/post/PostForm';

interface IProps extends IPostFormProps {}

export const EditPostForm: RC<IProps> = (props) => {
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
