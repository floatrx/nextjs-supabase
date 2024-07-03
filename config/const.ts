// Supabase auth
// TODO: make it private
export const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
// - storage
export const SUPABASE_DEFAULT_BUCKET = 'assets';
export const SUPABASE_BUCKET_URL = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_DEFAULT_BUCKET}`;
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Other
export const DEFAULT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
export const DEFAULT_DEBOUNCE_DELAY = 300; // milliseconds
export const TITLE_SEPARATOR = '•';

export const POST_PER_PAGE = 4;
