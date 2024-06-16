import { AddNoteForm } from '@/components/note/AddNoteForm';
import NoteItem from '@/components/note/NoteItem';
import { createClient } from '@/lib/supabase/server';

export default async function NotesSinglePage() {
  // Fetch notes from the database
  const supabase = await createClient();
  const { data: notes } = await supabase.from('notes').select();

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="w-full">
        <div className="container mt-5 space-y-4">
          <h2 className="text-3xl">Notes {notes?.length}</h2>
          {notes?.map((note) => <NoteItem key={note.id} note={note} />)}
          <AddNoteForm />
        </div>
      </div>
    </div>
  );
}
