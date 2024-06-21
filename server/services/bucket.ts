import { SUPABASE_DEFAULT_BUCKET } from '@/config/const';
import { prepareFileForUpload } from '@/lib/file';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Bucket service
 * - Upload to path (default: public)
 */
export const bucketService = {
  async upload(file: File, path: string = 'public') {
    const { filename, buffer } = await prepareFileForUpload(file);

    const supabase = await createServerClient();

    return supabase.storage.from(SUPABASE_DEFAULT_BUCKET).upload(`${path}/${filename}`, buffer, {
      contentType: file.type,
      upsert: true,
    });
  },
};
