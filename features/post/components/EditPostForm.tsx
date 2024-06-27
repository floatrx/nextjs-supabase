'use client';

import type { TPost } from '@/types/post';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { updatePost } from '@/features/post/actions/updatePost';
import { PostForm, type IPostFormProps } from '@/features/post/components/PostForm';
import { useServerAction } from '@/hooks/useServerAction';

interface IProps extends IPostFormProps {
  id: TPost['id'];
}

export const EditPostForm: RC<IProps> = (props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { execute } = useServerAction(updatePost);

  return (
    <PostForm
      {...props}
      loading={isPending}
      onSubmit={(values) => {
        startTransition(async () => {
          const post = await execute(props.id, values);

          if (!post?.data) return;
          router.push(`/blog/${post.data.slug}`);
        });
      }}
    />
  );
};
