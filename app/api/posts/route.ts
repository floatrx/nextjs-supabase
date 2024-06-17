import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

import { formatPostgrestResponse, formatBadRequestResponse } from '@/lib/supabase/formatResponse';
import { createServerClient } from '@/lib/supabase/server';
import { postService } from '@/server/services/post';

export async function GET(_req: NextRequest, _ctx: { params: Params }) {
  const supabase = await createServerClient();

  const res = await supabase
    // Select all posts fields from the posts table & join the author's profile with the role
    .from('posts')
    .select('*, author: profiles (*, role: roles (*))')
    .order('created_at', { ascending: false });

  return formatPostgrestResponse(res);
}

// Create
export async function POST(req: NextRequest) {
  const data = req.body;

  console.log('data', data);

  return Response.json({ res: 'create post route' });
}

// Update
export async function PUT(_req: NextRequest) {}

// Remove
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return formatBadRequestResponse('Post ID is required');
    }

    const res = await postService.delete(id);

    // TODO: Review revalidation strategy
    revalidatePath('/');
    revalidateTag('posts');

    console.log('deleted post', id);

    return formatPostgrestResponse(res);
  } catch ({ message }) {
    return Response.json({ message }, { status: 500 });
  }
}
