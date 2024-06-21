/**
 * Capitalize the first letter of a string
 * @param str
 */
export const upperFirst = (str?: string | null): string => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
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

/**
 * Remove extra spaces from a string
 */
const removeExtraSpaces = (str: string): string => str.replace(/\s+/g, ' ').trim();

/**
 * Remove markdown ```code blocks``` from a string
 */
const removeMarkdownCode = (str: string): string => str.replace(/```[^]+?```/g, '');

/**
 * Remove markdown *emphasis* and _emphasis_ from a string
 */
const removeMarkdownMarkup = (str: string): string => str.replace(/[*_]/g, '');

/**
 * Remove Markdown links from a string (e.g. [link](https://example.com))
 */
const removeMarkdownLinks = (str: string): string => str.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/**
 * Remove Markdown images from a string (e.g. ![alt](https://placehold.co/1.png))
 */
const removeMarkdownImages = (str: string): string => str.replace(/!\[([^\]]+)\]\([^)]+\)/g, '');

/**
 * Remove Markdown headings from a string (e.g. # Heading 1)
 */
const removeMarkdownHeadings = (str: string): string => str.replace(/#+.*?\n/g, '');

/**
 * Remove HTML tags from a string
 */
const removeHTMLTags = (str: string): string => str.replace(/<[^>]*>/g, '');

/**
 * Get a post excerpt from the body (first 300 characters by default)
 * @param body - The post body
 * @param length - The length of the excerpt
 */
const getPostExcerpt = (body: string, length = 300): string => {
  const excerpt = body.slice(0, length);

  return excerpt.length === length ? `${excerpt}...` : excerpt;
};

/**
 * Decode HTML character codes
 */
const decodeHtmlCharCodes = (str: string): string =>
  str.replace(/&#(x?)(\d+);/g, (_, isHex, numStr) => String.fromCharCode(parseInt(numStr, isHex ? 16 : 10)));

/**
 * Safely get a post excerpt
 * @param body {string} - The post body
 * @returns {string} - The post excerpt without HTML tags, extra spaces, and markdown...
 */
export const safePostExcerpt = (body: string): string =>
  [
    // Apply the functions in the order they are listed
    removeHTMLTags,
    removeExtraSpaces,
    removeMarkdownCode,
    removeMarkdownMarkup,
    getPostExcerpt,
    removeMarkdownLinks,
    removeMarkdownImages,
    removeMarkdownHeadings,
    decodeHtmlCharCodes,
  ].reduce((res, fn) => fn(res), body);
