import { formatPostgrestResponse, formatResponse } from '@/lib/supabase/formatters';
import { postService } from '@/server/services/post';

// Remove
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return formatResponse('Post ID is required');
    }

    const res = await postService.remove(id);

    return formatPostgrestResponse(res);
  } catch ({ message }) {
    return Response.json({ message }, { status: 500 });
  }
}
