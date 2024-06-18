import { revalidatePath, revalidateTag } from 'next/cache';

import { formatPostgrestResponse, formatBadRequestResponse } from '@/lib/supabase/formatResponse';
import { postService } from '@/server/services/post';
import { postSearchSchema } from '@/validations/post';

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
      return formatBadRequestResponse('Post ID is required');
    }

    const res = await postService.delete(id);

    // TODO: Review revalidation strategy
    revalidatePath('/');
    revalidateTag('posts');

    return formatPostgrestResponse(res);
  } catch ({ message }) {
    return Response.json({ message }, { status: 500 });
  }
}
