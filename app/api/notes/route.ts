import { noteService } from '@/features/note/services/note';
import { formatResponse, formatPostgrestResponse } from '@/lib/supabase/formatters';

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
