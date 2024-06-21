/**
 * TODO: Add drag and drop functionality & animations (framer motion)
 */

import { AddNoteForm } from '@/components/features/note/AddNoteForm';
import { NoteItem } from '@/components/features/note/NoteItem';
import { Page } from '@/components/ui/layout/Page';
import { getMetadata } from '@/lib/next';
import { noteService } from '@/server/services/note';

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
