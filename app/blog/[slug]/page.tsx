import { title } from '@/components/primitives';
import { DateTime } from '@/components/ui/DateTime';
import { RichText } from '@/components/ui/RichText';
import { StorageImage } from '@/components/ui/StorageImage';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostAuthorInfo } from '@/features/post/components/PostAuthorInfo';
import { postService } from '@/features/post/services/post';
import { upperFirst } from '@/lib/string';
import { cn } from '@/lib/utils';

export default async function PostSinglePage({ params }: PageProps<{ slug: string }>) {
  const { slug } = params;
  const { error, data: post } = await postService.getBySlug(slug);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <article className="article container m-auto max-w-[920px] rounded-3xl border px-11 py-5">
      <header>
        <StorageImage className="-mt-10 rounded-lg shadow-2xl" src={post.thumbnail} />
        <h1 className={cn(title(), 'stack')}>
          {upperFirst(post.title)}
          <EditPostButton id={post.id} />
        </h1>

        <div className="stack flex-wrap gap-2 gap-y-0 text-nowrap text-sm text-muted-foreground sm:text-lg">
          <PostAuthorInfo author={post.author} />
          {' • '}
          <DateTime date={post.created_at} />
        </div>
      </header>
      <main className="mt-5">
        <RichText content={post.content} />
      </main>
    </article>
  );
}
