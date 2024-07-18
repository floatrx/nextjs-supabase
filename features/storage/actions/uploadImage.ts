'use server';

import { SUPABASE_DEFAULT_BUCKET } from '@/config/const';
import { UploadFileSchema } from '@/features/storage/actions/validators/uploadFileSchema';
import { prepareFileForUpload } from '@/features/storage/lib/file';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

export const uploadImage = authedProcedure.input(UploadFileSchema).handler(async ({ ctx, input }) => {
  const { file, path = 'public' } = input;

  const { filename, buffer } = await prepareFileForUpload(file);

  const { data, error } = await ctx.supabase.storage
    .from(SUPABASE_DEFAULT_BUCKET)
    .upload(`${path}/${filename}`, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw error.message;
  }

  return data;
});
