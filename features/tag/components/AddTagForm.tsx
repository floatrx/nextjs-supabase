'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { useServerAction } from 'zsa-react';

import { Form } from '@/components/ui/form/Form';
import { createTag } from '@/features/tag/actions/createTag';
import { TagCreateSchema } from '@/features/tag/actions/validators/tagCreateSchema';
import { cn } from '@/lib/utils/cn';

export const AddTagForm = () => {
  const {
    formState: { errors },
    ...form
  } = useForm({
    defaultValues: { name: '' },
    resolver: zodResolver(TagCreateSchema),
  });
  const { isPending, execute } = useServerAction(createTag);

  const handleSubmit = form.handleSubmit(async (payload) => {
    if (isPending) return;
    const [res] = await execute(payload);

    if (res?.error) return;
    toast.success('Tag added successfully');
    await mutate('tags'); // Invalidate SWR cache to refetch tags
    form.reset();
  });

  return (
    <Form className={cn('mt-4 flex gap-3 text-xl', isPending && 'lock')} size="lg" onSubmit={handleSubmit}>
      <Controller
        control={form.control}
        name="name"
        render={({ field }) => (
          <Input
            autoFocus
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            placeholder="Add new tag..."
            size="lg"
            variant="bordered"
            {...field}
          />
        )}
      />
      <Button isLoading={isPending} type="submit">
        Add Tag
      </Button>
    </Form>
  );
};
