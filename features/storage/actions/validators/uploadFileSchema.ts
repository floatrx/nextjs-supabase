import { z } from 'zod';

import { MAX_FILE_SIZE } from '@/config/const';

/**
 * NOTE: We can't pass `File` directly to the server-actions, so we need to wrap it to `FormData`
 * This validator schema also extracts the `File` instance from the `FormData`
 */
export const UploadFileSchema = z.object({
  path: z.string().optional(),
  file: z
    .instanceof(FormData)
    .refine((formData) => formData.has('file'), 'Expected FormData to contain a file')
    .transform((formData) => formData.get('file') as File)
    .refine((f) => f instanceof File, 'Expected FormData `file` to be an instance of File')
    .refine(({ size }) => size <= MAX_FILE_SIZE, 'File size exceeds max size'),
});
