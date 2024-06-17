'use client';

import type { TPostWithAuthor } from '@/types/post';

import { PostCard } from '@/components/features/post/PostCard';

interface IProps {
  posts: TPostWithAuthor[] | null;
}

export const PostsCards: RC<IProps> = ({ posts }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {!posts?.length && <p>No posts found</p>}
    {posts?.map((post) => <PostCard key={post.id} post={post} />)}
  </div>
);
