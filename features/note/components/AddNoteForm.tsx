'use client';

import { Input } from '@nextui-org/input';
import { useRef } from 'react';

import { Form } from '@/components/ui/form/Form';
import { Submit } from '@/components/ui/form/Submit';
import { createNote } from '@/features/note/actions/note';

export const AddNoteForm = () => {
  // Create a ref for resetting the form
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Form ref={formRef} className="stack mt-4 gap-5 text-xl">
      <Input ref={inputRef} autoFocus name="title" placeholder="Add new note..." size="lg" type="text" variant="bordered" />
      <div className="stack">
        <Submit
          formAction={async (formData) => {
            await createNote(formData);
            formRef.current?.reset();
            inputRef.current?.focus();
          }}
          pendingText="Adding note..."
          size="lg"
        >
          Add Note
        </Submit>
      </div>
    </Form>
  );
};
