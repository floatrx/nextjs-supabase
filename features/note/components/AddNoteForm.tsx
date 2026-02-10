'use client';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

import { Form } from '@/components/ui/form/Form';
import { createNote } from '@/features/note/actions/createNote';
import { NoteCreateSchema } from '@/features/note/actions/validators/noteCreateSchema';
import { cn } from '@/lib/utils/cn';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { zodResolver } from '@hookform/resolvers/zod';

export const AddNoteForm = () => {
  const {
    formState: { errors },
    ...form
  } = useForm({
    defaultValues: { title: '' },
    resolver: zodResolver(NoteCreateSchema),
  });
  const { execute, isPending } = useServerAction(createNote);

  const handleSubmit = form.handleSubmit(async ({ title }) => {
    if (isPending) return;
    const [, error] = await execute({ title });

    if (error) return;
    toast.success('Note added successfully');
    form.reset();
  });

  return (
    <Form className={cn('mt-4 flex gap-3 text-xl', isPending && 'lock')} size="lg" onSubmit={handleSubmit}>
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => (
          <Input
            autoFocus
            data-testid="note-input"
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            placeholder="Add new note..."
            size="lg"
            variant="bordered"
            {...field}
          />
        )}
      />
      <Button data-testid="add-note-button" isLoading={isPending} type="submit">
        Add Note
      </Button>
    </Form>
  );
};
