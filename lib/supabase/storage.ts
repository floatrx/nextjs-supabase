import { SUPABASE_BUCKET_URL } from '@/config/const';

/**
 * Get the full image URL from the image path
 * @param path - image path or URL
 * @returns Supabase storage full image URL
 */
export const getImageUrl = (path: string) => {
  return path.match(/^https/gi) ? path : `${SUPABASE_BUCKET_URL}/${path}`;
};
