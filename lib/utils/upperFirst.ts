/**
 * Capitalize the first letter of a string
 * @param str
 */
export const upperFirst = (str?: string | null): string => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};
