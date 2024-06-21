import { useState } from 'react';
import { toast } from 'sonner';

import { useApi } from '@/hooks/useApi';
import { checkFileSize } from '@/lib/file';
import { getImageUrl } from '@/lib/supabase/storage';

export const useUploadImage = (initialValue?: string | null) => {
  const [value, setValue] = useState(initialValue ?? '');
  const [upload, isLoading] = useApi<FormData, { data: { path: string } }>('post', 'upload', { tags: ['post'] });

  const reset = () => setValue('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the list

    if (!file) return;

    // Check if the file size exceeds 2MB
    if (!checkFileSize(file)) {
      toast.error('File size exceeds 2MB.');

      return;
    }

    const formData = new FormData(); // Create a new FormData instance

    formData.append('file', file); // Append the file to the FormData instance

    try {
      const { result } = await upload(formData); // Upload the file (API call

      if (result?.data) {
        setValue(getImageUrl(result.data.path));
        toast.success('File uploaded successfully.');
      }
    } catch (e) {
      toast.error('Error uploading file:', e.message);
    }
  };

  const inputProps: ComponentProps<'input'> = {
    onChange: handleUpload,
    hidden: true,
    type: 'file',
    accept: 'image/*',
  };

  return {
    imgUrl: value,
    isLoading,
    inputProps,
    reset,
  };
};
