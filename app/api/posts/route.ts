import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { NextResponse, NextRequest } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET(_req: NextRequest, _ctx: { params: Params }) {
  const supabase = await createClient();

  // Select all posts fields from the posts table & join the author's profile with the role
  const { error, data, status, statusText } = await supabase
    .from('posts')
    .select('*, author: profiles (*, role: roles (*))')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }

  return Response.json(data, { status, statusText });
}

export async function POST(req: Request) {
  const data = req.body;

  console.log('data', data);

  return Response.json({ res: 'create post route' });
}

export async function PUT(_req: Request) {}

export async function DELETE(_req: Request) {}

export async function PATCH(_req: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(_req: Request) {}
