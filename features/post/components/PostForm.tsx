'use client';

import type { FormState } from '@/types/form';
import type { TPostUpdate, TPost } from '@/types/post';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { RefreshCcw } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { Editor } from '@/components/ui/editor/Editor';
import { ImageUploader } from '@/components/ui/form/ImageUploader';
import { postCreate } from '@/features/post/actions/postCreate';
import { postUpdate } from '@/features/post/actions/postUpdate';
import { postCreateSchema } from '@/features/post/validators/post';
import { createSlug } from '@/lib/string';

export interface IPostFormProps {
  initialValues?: TPostUpdate;
  id?: string | number; // if provided, the form will be used for updating
  onComplete?: (response: FormState<TPost>) => void; // expose response to parent component
}

/**
 * Post form component for creating and updating posts
 * @param initialValues
 * @param id - Post ID for updating
 * @param onFinish
 * @constructor
 */
export const PostForm: FC<IPostFormProps> = ({ initialValues, id, onComplete }) => {
  const action = id ? postUpdate : postCreate;
  const [response, formAction] = useFormState(action, { statusText: '', status: 0, data: null });
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    formState: { errors, isDirty, dirtyFields },
    ...form
  } = useForm({
    resolver: zodResolver(postCreateSchema),
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

  // Handle form submission and display toast messages
  useEffect(() => {
    onComplete?.(response);

    // Other cases
    setLoading(false); // reset spinner

    if (!response.status) return;

    const toastVariant = response.status <= 204 ? 'success' : 'error';

    toast[toastVariant](response.statusText); // Displays a success message
  }, [response]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = form.handleSubmit(
    () => {
      setLoading(true);
      formAction(new FormData(formRef.current!));
    },
    (fieldErrors, _event) => {
      console.log('Error form submit', fieldErrors);
    },
  );

  return (
    <section className="mt-6">
      <form ref={formRef} action={formAction} className="space-y-8" onSubmit={handleSubmit}>
        {id && <input hidden readOnly name="id" value={id} />}

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
            <Input
              autoFocus
              description="Provide post title"
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title}
              label="Title"
              size="lg"
              variant="bordered"
              {...register('title', { required: true })}
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

        <Controller control={control} name="content" render={({ field }) => <Editor errorMessage={errors.content?.message} {...field} />} />
        <Button color="primary" disabled={!isDirty} isLoading={loading} size="lg" type="submit" variant="shadow">
          {loading ? 'Submitting...' : id ? 'Update' : 'Create'}
        </Button>
      </form>
    </section>
  );
};
