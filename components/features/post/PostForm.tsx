// TODO: Move logic up to the parent component -> Form should be responsible for the form state
'use client';

import type { TPostUpdate } from '@/types/post';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { Editor } from '@/components/editor/Editor';
import { postCreate, postUpdate } from '@/server/actions/posts';
import { postCreateSchema } from '@/validations/post';

interface IProps {
  initialValues?: TPostUpdate;
  id?: number;
  isLoading?: boolean;
}

/**
 * Post form component for creating and updating posts
 * @param initialValues
 * @param id
 * @constructor
 */
export const PostForm: FC<IProps> = ({ initialValues, id }) => {
  const action = id ? postUpdate : postCreate;
  const [response, formAction] = useFormState(action, { statusText: '', status: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      ...initialValues,
    },
  });

  // Sync slug with title if it's not dirty
  const title = useWatch({ control, name: 'title' });
  const isSlugDirty = dirtyFields.slug;

  useEffect(() => {
    if (isSlugDirty || initialValues) return; // user has changed the slug manually

    // Replace spaces with hyphens and make lowercase for slug
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    form.setValue('slug', slug, { shouldValidate: !!title });
  }, [title]);

  // Handle form submission and display toast messages
  useEffect(() => {
    setLoading(false);
    if (!response.status) return;

    const toastVariant = response.status <= 204 ? 'success' : 'error';

    toast[toastVariant](response.statusText); // Displays a success message

    // On create
    if (response.status === 201) {
      router.push('/'); // Redirects to the current page

      return;
    }
  }, [response]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = form.handleSubmit(
    () => {
      setLoading(true);
      formAction(new FormData(formRef.current!));
    },
    (fieldErrors, _event) => {
      console.log('error form submit', fieldErrors);
    },
  );

  return (
    <section className="mt-6">
      <p>
        title: {JSON.stringify({ initialValues })} <br />
      </p>
      <form ref={formRef} action={formAction} className="space-y-8" onSubmit={handleSubmit}>
        {id && <input hidden readOnly name="id" value={id} />}
        <Controller
          control={control}
          name="slug"
          render={({ field }) => (
            <Input
              {...field}
              description="Provide post slug"
              errorMessage={errors.slug?.message}
              isInvalid={!!errors.slug}
              label="Slug"
              size="lg"
              startContent={<span className="text-muted-foreground">/blog/</span>}
              variant="bordered"
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
        <Controller control={control} name="content" render={({ field }) => <Editor errorMessage={errors.content?.message} {...field} />} />
        <Button disabled={!isDirty} isLoading={loading} size="lg" type="submit" variant="bordered">
          {loading ? 'Submitting...' : id ? 'Update' : 'Create'}
        </Button>
      </form>
    </section>
  );
};
