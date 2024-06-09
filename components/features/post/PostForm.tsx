'use client';

import type { TPostUpdate } from '@/types/post';

import dynamic from 'next/dynamic';
import { Button } from '@nextui-org/button';
import { useForm, Controller } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@nextui-org/input';

import { MarkdownEditorSkeleton } from '@/components/editor/EditorSkeleton';
import { postCreateSchema } from '@/validators/postSchema';
import { postCreate, postUpdate } from '@/actions/posts';
import { Form } from '@/components/form/Form';

interface IProps {
  initialValues?: TPostUpdate;
  id?: number;
  isLoading?: boolean;
}

// Lazy load MarkdownEditor
const MdEditorLazy = dynamic(
  () => import('@/components/editor/MdEditor'),
  // Disable SSR for this component, use skeleton instead
  { ssr: false, loading: MarkdownEditorSkeleton },
);

export const PostForm: FC<IProps> = ({ initialValues, id }) => {
  const action = id ? postUpdate : postCreate;
  const [{ status, statusText }, formAction] = useFormState(action, { statusText: '', status: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    formState: { errors, isDirty, isLoading },
    ...form
  } = useForm({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: '',
      content: '',
      ...initialValues,
    },
  });

  useEffect(() => {
    const toastVariant = status > 400 ? 'success' : 'error';

    toast[toastVariant](statusText); // Displays a success message

    // On create
    if (status === 201) {
      router.push('/'); // Redirects to the current page

      return;
    }

    setLoading(false);
  }, [statusText, status]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = form.handleSubmit(() => {
    setLoading(true);
    formAction(new FormData(formRef.current!));
  });

  return (
    <section className="mt-6">
      <Form ref={formRef} action={formAction} className="space-y-8" onSubmit={handleSubmit}>
        {id && <input hidden readOnly name="id" value={id} />}
        <Input
          autoFocus
          description="Provide post slug"
          errorMessage={errors.slug?.message}
          isInvalid={!!errors.slug}
          label="Slug"
          size="lg"
          startContent={<span className="text-muted-foreground">/blog/</span>}
          variant="bordered"
          {...register('slug', { required: true })}
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
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <>
              <MdEditorLazy {...field} ref={null} />
              {/* This trick fixes formData > content */}
              <textarea hidden readOnly {...field} />
              {!!errors.content && <p className="m-0 border text-danger">* {errors?.content?.message}</p>}
            </>
          )}
        />
        <Button disabled={!isDirty} isLoading={loading} size="lg" type="submit" variant="bordered">
          {loading ? 'Submitting...' : id ? 'Update' : 'Create'}
        </Button>
      </Form>
    </section>
  );
};
