import type { FieldErrors } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const humanizeError = (errors: FieldErrors<any>) => {
  const messages: string[] = [];

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      const error = errors[key];

      if (!error?.message) continue;

      messages.push(`"${key}": ${error.message}`);
    }
  }

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

  return formatter.format(messages);
};
