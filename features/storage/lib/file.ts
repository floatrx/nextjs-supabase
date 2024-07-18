import { MAX_FILE_SIZE } from '@/config/const';

/**
 * Get a file from a request by input name (key)
 * @param req - Request
 * @param inputName - Input name (default: 'file')
 * @returns File | null
 */
export const getFileFromRequest = async (req: Request, inputName: string = 'file'): Promise<File | null> => {
  const formData = await req.formData();

  return formData.get(inputName) as File | null;
};

/**
 * Get a FormData instance from a file
 * NOTE: Server-actions not accept File instances directly, so we need to wrap it to FormData...
 * @param file
 * @returns FormData with the file
 */
export const wrapFileWithFormData = (file: File): FormData => {
  const formData = new FormData();

  formData.append('file', file);

  return formData;
};

/**
 * Generate a unique filename based on the original filename
 * @param filename
 * @returns string
 */
const safeFileName = (filename: string): string => {
  const ext = filename.slice((Math.max(0, filename.lastIndexOf('.')) || Infinity) + 1);
  const timestamp = Date.now();

  return `${timestamp}.${ext}`;
};

/**
 * Check if the file size is within the limit
 * @param file
 * @param maxSize - Maximum file size in bytes (default: 2MB / const.ts)
 */
export const checkFileSize = (file: File, maxSize: number = MAX_FILE_SIZE): boolean => {
  return file.size <= maxSize;
};

/**
 * Prepare a file for upload
 * @param file
 * @returns { filename: string; buffer: Buffer }
 */
export const prepareFileForUpload = async (file: File): Promise<{ filename: string; buffer: Buffer }> => {
  const filename = safeFileName(file.name);

  // Read the file buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  return { filename, buffer };
};
