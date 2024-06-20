export type FormState<T> = {
  status: number;
  statusText: string;
  data: T | null;
};

/**
 * Server action function type
 * @example
 *  const postCreate: FormAction<TPost> = async (prevState, data) => {};
 * @see ./server/actions/post.ts
 */
export type FormAction<T = null> = (prevState: any, data: FormData) => Promise<FormState<T>>;
