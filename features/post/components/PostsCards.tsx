import type { TPostExtended } from '@/types/post';

import { PostCard } from '@/features/post/components/PostCard';

interface IProps {
  posts: TPostExtended[] | null;
}

export const PostsCards: RC<IProps> = ({ posts }) => (
  <div className="mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {!posts?.length && <p>No posts found</p>}
    {posts?.map((post) => <PostCard key={post.id} post={post} />)}
  </div>
);
