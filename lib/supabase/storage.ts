import { SUPABASE_BUCKET_URL } from '@/config/const';

export const getImageUrl = (path: string) => {
  return path.match(/^https/gi) ? path : `${SUPABASE_BUCKET_URL}/${path}`;
};
