'use client';

import type { TNote } from '@/types/note';

import { RemoveNoteButton } from '@/features/note/components/RemoveNoteButton';
import { upperFirst } from '@/lib/string';

interface IProps {
  note: TNote;
}

export const NoteItem: RC<IProps> = ({ note }) => (
  <div key={note.id} className="rounded-xl border-b bg-foreground-50 px-4 py-2 shadow-sm">
    <div className="stack">
      <RemoveNoteButton id={note.id} />
      <p className="flex w-full justify-between gap-2 text-xl">
        {upperFirst(note.title)} <span className="opacity-20">{note.id}</span>
      </p>
    </div>
  </div>
);
