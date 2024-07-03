/**
 * TODO: REFACTOR
 *  1. add zod-resolver
 *  2. add more fields
 *  3. add avatar upload
 */
'use client';

import type { Tables } from '@/types/supabase';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { formVariants } from '@/components/primitives';
import { Form } from '@/components/ui/form/Form';
import { ImageUploader } from '@/components/ui/form/ImageUploader';
import { updateUserProfile } from '@/features/user/actions/updateUserProfile';
import { cn } from '@/lib/utils/cn';

interface IProps {
  id: string;
  initialValues: Partial<Tables<'profiles'>>;
}

export const UserProfileForm: RC<IProps> = ({ id, initialValues }) => {
  const [isSubmitting, startTransition] = useTransition();
  const form = useForm({
    defaultValues: initialValues,
  });

  const handleSubmit = form.handleSubmit(async ({ username = '', avatar = '' }) => {
    startTransition(async () => {
      await updateUserProfile({ id, payload: { username, avatar } });
      form.reset({ username }); // reset with new values...
    });
  });

  return (
    <Form
      className={cn(formVariants({ isSubmitting }), 'max-w-md')}
      size="lg"
      variant="bordered"
      onSubmit={handleSubmit}
    >
      <Controller
        control={form.control}
        name="username"
        render={({ field }) => <Input required label="Username" {...field} />}
      />
      <Controller
        control={form.control}
        name="avatar"
        render={({ field }) => <ImageUploader errorMessage={form.formState.errors.avatar?.message} {...field} />}
      />
      <Button disabled={!form.formState.isDirty} isLoading={isSubmitting} type="submit">
        Save settings
      </Button>
      <Button type="reset" onClick={() => form.reset(initialValues)}>
        Reset
      </Button>
    </Form>
  );
};
