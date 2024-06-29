import { ZodSchema, z } from 'zod';

/**
 * Parse form data to object (type-safe)
 * @param formData - FormData
 * @param schema - Zod validation schema
 */
export const parseFormData = <T extends ZodSchema<any>>(formData: FormData, schema: T) => {
  const data = Object.fromEntries(formData);
  const result = schema.safeParse(data);

  if (!result.success) {
    return null;
  }

  return result.data as z.infer<T>;
};
