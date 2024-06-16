'use client';

import type { TNote } from '@/types/note';

import { useState } from 'react';

import { removeNote } from '@/actions/notes';

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
    <div key={note.id} className="rounded-xl border-b border-b-foreground/10 bg-slate-100 px-4 py-2">
      <div className="stack">
        <p>
          {note.id}. {note.title}{' '}
        </p>
        <button
          className="bg-btn text-btn-foreground mx-2 rounded-md border px-2 hover:bg-success/90"
          disabled={loading}
          onClick={handleRemoveNote}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
