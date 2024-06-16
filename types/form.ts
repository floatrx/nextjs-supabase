// Server actions
export type FormState<T = null> = {
  statusText: string;
  status: number;
  issues?: string[];
  initialValues?: T;
  timestamp?: number;
};

export type FormAction = (prevState: FormState, data: FormData) => Promise<FormState>;
