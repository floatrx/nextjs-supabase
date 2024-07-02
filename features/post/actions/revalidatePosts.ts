import { revalidatePath } from 'next/cache';

export const revalidatePosts = () => revalidatePath('/');
