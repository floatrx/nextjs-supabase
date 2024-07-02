import type { TNote } from '@/types/note';

import { DeleteNoteButton } from '@/features/note/components/DeleteNoteButton';
import { upperFirst } from '@/lib/utils/upperFirst';

interface IProps {
  note: TNote;
}

export const NoteItem: RC<IProps> = ({ note }) => (
  <div key={note.id} className="rounded-xl border-b bg-foreground-50 px-4 py-2 shadow-sm">
    <div className="stack">
      <DeleteNoteButton id={note.id} />
      <p className="flex flex-1 justify-between gap-2 text-xl">
        {upperFirst(note.title)} <span className="opacity-20">{note.id}</span>
      </p>
    </div>
  </div>
);
