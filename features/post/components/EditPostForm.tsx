'use client';

import type { TPostId } from '@/types/post';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { updatePost } from '@/features/post/actions/updatePost';
import { PostForm, type IPostFormProps } from '@/features/post/components/PostForm';

interface IProps extends IPostFormProps {
  id: TPostId;
}

export const EditPostForm: RC<IProps> = (props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <PostForm
      {...props}
      loading={isPending}
      onSubmit={async (values) => {
        startTransition(async () => {
          const [post] = await updatePost({ id: props.id, values });

          if (!post) return;

          router.push(`/blog/${post.slug}`);
        });
      }}
    />
  );
};
