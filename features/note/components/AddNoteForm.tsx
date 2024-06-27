'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form/Form';
import { createNote } from '@/features/note/actions/createNote';
import { noteCreateSchema } from '@/features/note/validators/noteCreateSchema';
import { useServerAction } from '@/hooks/useServerAction';
import { cn } from '@/lib/utils';

export const AddNoteForm = () => {
  const {
    formState: { errors },
    ...form
  } = useForm({
    defaultValues: { title: '' },
    resolver: zodResolver(noteCreateSchema),
  });
  const { loading, execute } = useServerAction(createNote);

  const handleSubmit = form.handleSubmit(async (values) => {
    if (loading) return;
    const res = await execute(values);

    if (res?.error) return;
    toast.success('Note added successfully');
    form.reset();
  });

  return (
    <Form className={cn('mt-4 flex gap-3 text-xl', loading && 'lock')} size="lg" onSubmit={handleSubmit}>
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => (
          <Input
            autoFocus
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            placeholder="Add new note..."
            size="lg"
            variant="bordered"
            {...field}
          />
        )}
      />
      <Button isLoading={loading}>Add Note</Button>
    </Form>
  );
};
