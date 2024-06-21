import { getFileFromRequest } from '@/lib/file';
import { formatResponse } from '@/lib/supabase/formatters';
import { authService } from '@/server/services/auth';
import { storageService } from '@/server/services/storage';

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

    const { data, error } = await storageService.upload(file);

    if (error) {
      return formatResponse(error.message, 400);
    }

    return formatResponse('Success', 201, data);
  } catch (error) {
    return formatResponse('Upload failed', 500);
  }
}
