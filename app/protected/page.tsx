import { AddNoteForm } from '@/components/note/AddNoteForm';
import NoteItem from '@/components/note/NoteItem';
import { createClient } from '@/lib/supabase/server';

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from('notes').select();
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-600 text-white text-center">
          This is a protected page that you can only see as an authenticated user
        </div>

        <div className="container mt-5">
          <h2 className="text-3xl">Notes {notes?.length}</h2>
          {notes?.map((note) => <NoteItem note={note} key={note.id} />)}
          <AddNoteForm />
        </div>
      </div>
    </div>
  );
}
