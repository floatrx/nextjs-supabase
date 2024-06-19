// Server actions
export type FormState<T = null> = {
  statusText: string;
  status: number;
  data?: T | null;
};

export type FormAction<T = null> = (prevState: any, data: FormData) => Promise<FormState<T>>;
