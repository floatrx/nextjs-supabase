/**
 * TODO: Try server-action for delete
 */
'use client';
import { Button } from '@nextui-org/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Trash } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

export const DeletePost = ({ id }: { id: number }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Delete a post using client supabase API
  const deletePost = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      toast.error(`Error deleting post. ${error.message}`);
    } else {
      toast.success('Post deleted successfully.');
      router.refresh();
    }
  };

  return (
    <Button
      isIconOnly
      className="hover:text-red-500"
      isLoading={pending}
      size="sm"
      variant="ghost"
      onClick={() => {
        startTransition(() => deletePost(id));
      }}
    >
      <Trash size={16} />
    </Button>
  );
};
