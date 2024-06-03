'use client';

import { useState } from 'react';
import { removeNote } from '@/actions/note';
import type { TNote } from '@/types/tables';

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
    <div key={note.id} className="py-2 border-b border-b-foreground/10 rounded-xl">
      <h3>
        {note.id}. {note.title}{' '}
        <button
          disabled={loading}
          className="border bg-btn text-btn-foreground rounded-md px-2 mx-2 hover:bg-success/90"
          onClick={handleRemoveNote}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </h3>
    </div>
  );
}
