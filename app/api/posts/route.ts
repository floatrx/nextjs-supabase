import { postService } from '@/features/post/services/post';
import { formatPostgrestResponse, formatResponse } from '@/lib/supabase/formatters';

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
