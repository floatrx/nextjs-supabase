import { formatResponse, formatPostgrestResponse } from '@/lib/supabase/formatters';
import { noteService } from '@/server/services/note';

export async function DELETE(req: Request) {
  try {
    const id = await req.json();

    if (!id) return formatResponse('Post ID is required');

    const res = await noteService.remove(id);

    return formatPostgrestResponse(res);
  } catch ({ message }) {
    return formatResponse(message, 500);
  }
}
