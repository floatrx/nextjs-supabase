import { PostForm } from '@/components/features/post/PostForm';
import { title } from '@/components/primitives';

export default async function CreatePostPage() {
  return (
    <>
      <h1 className={title()}>Create new Post</h1>
      <PostForm />
    </>
  );
}
