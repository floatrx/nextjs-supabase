import { ZodSchema, z } from 'zod';

/**
 * Parse form data to object (type-safe)
 * @param formData - FormData
 * @param schema - Zod validation schema
 */
export const parseFormData = (formData: FormData, schema: ZodSchema) => {
  const data = Object.fromEntries(formData);
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error('Validation failed');
  }

  return result.data as z.infer<typeof schema>;
};
