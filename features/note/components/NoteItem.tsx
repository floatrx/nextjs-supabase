import type { TNote } from '@/types/note';

import { DeleteNoteButton } from '@/features/note/components/DeleteNoteButton';
import { upperFirst } from '@/lib/utils/upperFirst';

interface IProps {
  note: TNote;
}

export const NoteItem: RC<IProps> = ({ note }) => (
  <div key={note.id} className="bg-foreground-50 rounded-xl border-b px-4 py-2 shadow-sm" data-testid="note-item">
    <div className="stack">
      <DeleteNoteButton id={note.id} data-testid="delete-note-button" />
      <p className="flex flex-1 justify-between gap-2 text-xl">
        {upperFirst(note.title)} <span className="opacity-20">{note.id}</span>
      </p>
    </div>
  </div>
);
