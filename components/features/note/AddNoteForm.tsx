'use client';

import { Input } from '@nextui-org/input';
import { useRef } from 'react';

import { Form } from '@/components/ui/form/Form';
import { Submit } from '@/components/ui/form/Submit';
import { createNote } from '@/server/actions/note';

export const AddNoteForm = () => {
  // Create a ref for resetting the form
  const ref = useRef<HTMLFormElement>(null);

  return (
    <Form ref={ref} className="stack mt-4 gap-5 text-xl">
      <Input name="title" placeholder="Add new note..." type="text" />
      <div className="stack">
        <Submit
          className="rounded-md bg-success px-4 py-2 text-success-foreground hover:bg-success/90"
          formAction={async (formData) => {
            await createNote(formData);
            ref.current?.reset();
          }}
          pendingText="Adding note..."
        >
          Add Note
        </Submit>
      </div>
    </Form>
  );
};