import type { TPost } from '@/types/post';

import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { getPostBySlug } from '@/features/post/actions/getPost';
import { DeletePostButton } from '@/features/post/components/DeletePostButton';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostArticle } from '@/features/post/components/PostArticle';

export default async function PostSinglePage(props: PageProps<Pick<TPost, 'slug'>>) {
  const params = await props.params;
  const { slug } = params;

  // Query post by slug
  const [post, error] = await getPostBySlug(slug);

  if (error) {
    return <h1>Post not found or deleted</h1>;
  }

  return (
    <>
      <PostArticle className="container m-auto max-w-[920px] rounded-3xl border px-11 py-5" post={post} />
      <OnlyAuth userId={post.author?.id}>
        <div className="container m-auto mt-4 max-w-[920px]">
          <div className="stack">
            <EditPostButton id={post.id} size="lg" title="Edit" />
            <DeletePostButton id={post.id} size="lg" title="Delete" />
          </div>
        </div>
      </OnlyAuth>
    </>
  );
}
