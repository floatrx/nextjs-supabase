'use client';

import { useRef } from 'react';
import { createNote } from '@/actions/note';
import { Form } from '@/components/form/Form';
import { Input } from '@/components/form/Input';
import { Submit } from '@/components/form/Submit';

export const AddNoteForm = () => {
  // Create a ref for resetting the form
  const ref = useRef<HTMLFormElement>(null);

  return (
    <Form className="stack mt-4 gap-5 text-xl" ref={ref}>
      <Input name="title" placeholder="Add new note..." type="text" autofocus />
      <div className="stack">
        <Submit
          pendingText="Adding note..."
          formAction={async (formData) => {
            await createNote(formData);
            ref.current?.reset();
          }}
          className="bg-success text-success-foreground rounded-md px-4 py-2 hover:bg-success/90"
        >
          Add Note
        </Submit>
      </div>
    </Form>
  );
};
