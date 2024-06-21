import { formatPostgrestResponse, formatResponse } from '@/lib/supabase/formatters';
import { postService } from '@/server/services/post';
import { postSearchSchema } from '@/validators/post';

// Search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Parse search params
  const parsed = postSearchSchema.safeParse({
    title: searchParams.get('title'),
  });

  // Search posts
  const res = await postService.search(parsed.data);

  return formatPostgrestResponse(res);
}

// Create
export async function POST(req: Request) {
  const data = req.body;

  console.log('data', data);

  return Response.json({ res: 'create post route' });
}

// Update
export async function PUT(_req: Request) {}

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
