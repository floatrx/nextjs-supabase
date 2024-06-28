import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { DateTime } from '@/components/ui/DateTime';
import { Dot } from '@/components/ui/Dot';
import { Heading } from '@/components/ui/layout/headings/Heading';
import { RichText } from '@/components/ui/RichText';
import { StorageImage } from '@/components/ui/StorageImage';
import { DeletePostButton } from '@/features/post/components/DeletePostButton';
import { EditPostButton } from '@/features/post/components/EditPostButton';
import { PostAuthorInfo } from '@/features/post/components/PostAuthorInfo';
import { PostTagsList } from '@/features/post/components/PostTagsList';
import { postService } from '@/features/post/services/post';
import { upperFirst } from '@/lib/string';

export default async function PostSinglePage({ params }: PageProps<{ slug: string }>) {
  const { slug } = params;
  const { error, data: post } = await postService.getBySlug(slug);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  const idAuthor = post.author?.id;

  return (
    <article className="container m-auto max-w-[920px] rounded-3xl border px-11 py-5">
      <header className="space-y-6">
        <StorageImage className="-mt-10 mb-6 rounded-lg shadow-2xl" src={post.thumbnail} />
        <Heading>
          <span>{upperFirst(post.title)}</span>
        </Heading>

        <div className="stack flex-wrap gap-2 gap-y-0 text-nowrap text-sm text-muted-foreground sm:text-lg">
          <PostAuthorInfo author={post.author} />
          <Dot />
          <DateTime date={post.created_at} />
          <Dot />
        </div>

        <hr />

        <OnlyAuth idUser={idAuthor}>
          <div className="stack mt-2">
            <EditPostButton id={post.id} size="lg" title="Edit" />
            <DeletePostButton id={post.id} size="lg" title="Delete" />
          </div>
        </OnlyAuth>
      </header>
      <main className="article-content mt-5">
        <RichText content={post.content} />
      </main>

      <footer>
        <hr className="my-4" />
        <PostTagsList interactive post={post} size="lg" variant="flat" wrapperClassName="gap-4" />
      </footer>
    </article>
  );
}
