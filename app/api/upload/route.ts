import { SUPABASE_BUCKET } from '@/config/const';
import { prepareFileForUpload, getFileFromRequest } from '@/lib/file';
import { formatResponse } from '@/lib/supabase/formatters';
import { createServerClient } from '@/lib/supabase/server';
import { authService } from '@/server/services/auth';

export async function POST(req: Request) {
  const user = authService.getUser();

  if (!user) {
    return formatResponse('Unauthorized', 401);
  }

  try {
    const file = await getFileFromRequest(req);

    if (!file) {
      return formatResponse('No files received.', 400);
    }

    const { filename, buffer } = await prepareFileForUpload(file);

    const supabase = await createServerClient();
    const { data, error } = await supabase.storage
      // upload file to the assets bucket...
      .from(SUPABASE_BUCKET)
      .upload(`public/${filename}`, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return formatResponse(error.message, 400);
    }

    return formatResponse('Success', 201, data);
  } catch (error) {
    return formatResponse('Upload failed', 500);
  }
}
