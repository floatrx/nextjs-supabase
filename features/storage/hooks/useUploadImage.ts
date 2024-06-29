import type { TStorageUploadResponse } from '@/types/storage';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useApi } from '@/hooks/useApi';
import { checkFileSize, getFormDataFromFile } from '@/lib/file';
import { getImageUrl } from '@/lib/supabase/storage';

/**
 * Hook to handle image upload process
 * - Upload image to the server
 * - Get the full image URL
 * - Reset the uploaded image
 * - Show toaster on success/error
 * - Check if the file size exceeds 2MB
 * @param initialValue - initial image URL from parent form component
 *
 */
export const useUploadImage = (initialValue?: string | null) => {
  const [imgUrl, setImgUrl] = useState(initialValue ?? '');
  const [upload, isLoading] = useApi<FormData, TStorageUploadResponse>('post', 'upload');

  // Initial value could be updated from the parent component... Sync it!
  useEffect(() => setImgUrl(initialValue ?? ''), [initialValue]);

  // Reset imgUrl
  const reset = () => setImgUrl('');

  // Handle file upload → show toaster on success/error
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the list

    if (!file) {
      toast.error('No file selected.');

      return;
    }

    // Check if the file size exceeds 2MB
    if (!checkFileSize(file)) {
      toast.error('File size exceeds 2MB.');

      return;
    }

    try {
      // Upload the file (API call
      const { result } = await upload(getFormDataFromFile(file));

      if (result?.data) {
        // Set the full supabase storage image URL as the value
        setImgUrl(getImageUrl(result.data.path));
        toast.success('File uploaded successfully.');
      }
    } catch (e) {
      toast.error('Error uploading file:', e.message);
    }
  };

  // Input file props to spread ...
  const inputProps: ComponentProps<'input'> = {
    onChange: handleUpload,
    hidden: true,
    type: 'file',
    accept: 'image/*',
  };

  return {
    imgUrl,
    isLoading,
    inputProps,
    reset,
  };
};
