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
