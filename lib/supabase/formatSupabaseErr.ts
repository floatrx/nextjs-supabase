export const formatSupabaseErr = (message: string, code: number = 400) => ({
  status: code,
  statusText: message,
  data: null,
  error: {
    code,
    message,
  },
});
