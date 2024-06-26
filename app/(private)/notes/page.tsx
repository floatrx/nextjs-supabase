/**
 * TODO: Add drag and drop functionality & animations (framer motion)
 */

import { Page } from '@/components/ui/layout/Page';
import { AddNoteForm } from '@/features/note/components/AddNoteForm';
import { NoteItem } from '@/features/note/components/NoteItem';
import { noteService } from '@/features/note/services/note';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Notes');

export default async function NotesSinglePage() {
  const { data: notes } = await noteService.search();

  return (
    <Page count={notes?.length} meta={metadata}>
      <div className="container mt-5 h-full space-y-4">
        <AddNoteForm />
        {notes?.map((note) => <NoteItem key={note.id} note={note} />)}
      </div>
    </Page>
  );
}
