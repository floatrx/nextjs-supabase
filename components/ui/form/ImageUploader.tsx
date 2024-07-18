'use client';

import { Button } from '@nextui-org/button';
import { Upload, X } from 'lucide-react';
import { forwardRef, useEffect } from 'react';

import { Loader } from '@/components/ui/Loader';
import { StorageImage } from '@/components/ui/StorageImage';
import { useUploadImage } from '@/features/storage/hooks/useUploadImage';
import { cn } from '@/lib/utils/cn';

interface IProps {
  value: string | null | undefined;
  errorMessage?: string; // error message to display (received from the parent form)
  className?: string;
  onChange?: (imgUrl: string) => void;
}

type Component = React.ForwardRefExoticComponent<IProps & React.RefAttributes<HTMLInputElement>>;

/**
 * ImageUploader component
 * NOTE: This component is used to upload images to the server
 * - input#file - hidden input for file upload, it is used to trigger the file selection dialog and upload the file
 * - other input - hidden input for the image URL, it is used to store the image URL end expose it to the parent component
 * Hook useUploadImage is used to handle the image upload process. It returns the following properties:
 * - isLoading - boolean flag to indicate if the image is being uploaded
 * - inputProps - props for the input#file element
 * - imgUrl - URL of the uploaded image
 * - reset - function to reset the uploaded image
 */
export const ImageUploader: Component = forwardRef(({ value, errorMessage, className, onChange, ...props }, ref) => {
  const { isUploading, inputProps, imgUrl, reset } = useUploadImage(value);

  // Expose URL to the form
  useEffect(() => {
    onChange?.(imgUrl);
  }, [imgUrl]);

  return (
    <div className="relative">
      <label
        className={cn(
          `stack relative size-[220px] max-h-[152px] w-full max-w-[220px] cursor-pointer justify-center overflow-hidden rounded-xl border-2 bg-foreground/5 p-2`,
          className,
        )}
        htmlFor="file" // dialog trigger
      >
        {imgUrl ? (
          // Show preview image
          <StorageImage className="size-fit rounded-lg" src={imgUrl} />
        ) : (
          // Show trigger component if image is not uploaded
          !isUploading && (
            <span className="flex flex-col">
              <Upload className="m-auto opacity-30" size={32} /> Upload thumbnail
            </span>
          )
        )}
        <input id="file" {...inputProps} />
        <Loader className={cn(imgUrl && 'absolute z-10')} loading={isUploading} size="md" />
      </label>
      {imgUrl && (
        <Button isIconOnly className="absolute -left-2 -top-2 z-10" size="sm" onClick={reset}>
          <X size={14} />
        </Button>
      )}
      <input {...props} ref={ref} hidden readOnly value={imgUrl} />
      {errorMessage && <p className="m-0 text-danger">{errorMessage}</p>}
    </div>
  );
});

ImageUploader.displayName = 'UploadImage';
