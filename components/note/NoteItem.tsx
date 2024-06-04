'use client';

import type { TNote } from '@/types/tables';

import { useState } from 'react';

import { removeNote } from '@/app/notes/note';

export default function NoteItem({ note }: { note: TNote }) {
  const [loading, setLoading] = useState(false);

  async function handleRemoveNote() {
    setLoading(true);
    try {
      await removeNote(note.id);
    } catch (error) {
      console.error('Failed to remove note:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div key={note.id} className="rounded-xl border-b border-b-foreground/10 py-2">
      <h3>
        {note.id}. {note.title}{' '}
        <button
          className="bg-btn text-btn-foreground mx-2 rounded-md border px-2 hover:bg-success/90"
          disabled={loading}
          onClick={handleRemoveNote}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </h3>
    </div>
  );
}
