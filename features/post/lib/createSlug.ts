/**
 * Create a slug from a string (e.g. "Example title" -> "example-title")
 * @param input - string to convert to slug
 */
export const createSlug = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w\d\s-]/g, '');
};
