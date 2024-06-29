export type TStorageUploadResponse = {
  status: number;
  statusText: string;
  data: {
    fullPath: string;
    id: string;
    path: string;
  };
};
