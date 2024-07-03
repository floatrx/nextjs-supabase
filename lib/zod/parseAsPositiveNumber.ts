/**
 * Zod preprocess function to parse a value as a positive number.
 * @param def - Default value if parsing fails
 * @example
 * z.object({
 *  page: z.preprocess(parseAsPositiveNumber(1), z.number().int()),
 * });
 */
export const parseAsPositiveNumber =
  (def: number) =>
  (val: unknown): number =>
    Math.abs(Number(val)) || def;
