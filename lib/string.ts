/**
 * Capitalize the first letter of a string
 * @param str
 */
export const upperFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get the excerpt of a string
 * @param content
 * @param length - default is 300
 */
export const getExcerpt = (content: string, length: number = 300): string => {
  return content.length > length ? content.slice(0, length) + '…' : content;
};

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
