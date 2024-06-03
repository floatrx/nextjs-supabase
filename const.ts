export const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const DEFAULT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
