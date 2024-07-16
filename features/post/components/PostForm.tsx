'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { RefreshCcw } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';

import { Editor } from '@/components/ui/editor/Editor';
import { ImageUploader } from '@/components/ui/form/ImageUploader';
import { PostCreateSchema } from '@/features/post/actions/validators/postCreateSchema';
import { createSlug } from '@/features/post/lib/createSlug';
import { cn } from '@/lib/utils/cn';

interface FormValues {
  title: string;
  content: string;
  slug: string;
  thumbnail: string | null;
}

export interface IPostFormProps {
  initialValues?: Partial<FormValues>;
  onSubmit?: (values: FormValues) => void; // expose response to parent component
  loading?: boolean;
}

/**
 * Post form component for creating and updating posts
 * @param initialValues
 * @param id - Post ID for updating
 * @param onSubmit - Submit handler
 * @param loading
 * @constructor
 */
export const PostForm: FC<IPostFormProps> = ({ initialValues, onSubmit, loading = true }) => {
  const isEditMode = !!initialValues;

  const {
    control,
    formState: { errors, isDirty, dirtyFields },
    ...form
  } = useForm({
    resolver: zodResolver(PostCreateSchema),
    defaultValues: {
      title: '',
      content: '',
      slug: '',
      thumbnail: '',
      ...initialValues,
    },
  });

  // Sync slug with title if it's not dirty
  const title = useWatch({ control, name: 'title' });
  const isSlugDirty = Boolean(dirtyFields.slug && form.getValues().slug);
  const syncSlugWithTitle = () => form.setValue('slug', createSlug(title));

  useEffect(() => {
    if (isSlugDirty || initialValues) return; // user has changed the slug manually

    syncSlugWithTitle();
  }, [title]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = form.handleSubmit(
    async (values) => {
      if (loading) return;
      onSubmit?.(values);
    },
    (fieldErrors, _event) => {
      console.log('Error form submit', fieldErrors);
    },
  );

  return (
    <section className="relative mt-6">
      <form ref={formRef} className={cn('space-y-8', loading && 'locked')} onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="left flex-1">
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <Input
                  {...field}
                  description="Provide post slug"
                  endContent={
                    <Button isIconOnly variant="light" onClick={syncSlugWithTitle}>
                      <RefreshCcw size={18} />
                    </Button>
                  }
                  errorMessage={errors.slug?.message}
                  isInvalid={!!errors.slug}
                  label="Slug"
                  size="lg"
                  startContent={<span className="text-muted-foreground">/blog/</span>}
                  variant="bordered"
                  onDoubleClick={() => form.setValue('slug', createSlug(title), { shouldValidate: true })}
                />
              )}
            />
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  autoFocus
                  description="Provide post title"
                  errorMessage={errors.title?.message}
                  isInvalid={!!errors.title}
                  label="Title"
                  size="lg"
                  variant="bordered"
                  {...field}
                />
              )}
            />
          </div>
          <div className="right min-w-[240px]">
            <Controller
              control={control}
              name="thumbnail"
              render={({ field }) => <ImageUploader errorMessage={errors.thumbnail?.message} {...field} />}
            />
          </div>
        </div>

        <Controller
          control={control}
          name="content"
          render={({ field }) => <Editor errorMessage={errors.content?.message} {...field} />}
        />
        <Button color="primary" disabled={!isDirty} isLoading={loading} size="lg" type="submit" variant="shadow">
          {loading ? 'Submitting...' : isEditMode ? 'Update' : 'Create'}
        </Button>
      </form>
    </section>
  );
};
