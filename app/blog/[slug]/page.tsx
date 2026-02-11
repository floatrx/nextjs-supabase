import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { getPostBySlug } from '@/features/post/actions/getPost';
import { DeletePostButton } from '@/features/post/components/DeletePostButton';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostArticle } from '@/features/post/components/PostArticle';

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const params = await props.params;
  const [post] = await getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  const description = post.seo_description || post.content?.slice(0, 160);

  return {
    title: post.seo_title || post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function PostSinglePage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const slug = params.slug;

  // Query post by slug
  const [post, error] = await getPostBySlug(slug);

  if (error || !post) {
    notFound();
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
