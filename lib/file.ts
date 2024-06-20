export const getFileFromRequest = async (req: Request, inputName: string = 'file'): Promise<File | null> => {
  const formData = await req.formData();

  return formData.get(inputName) as File | null;
};

export const prepareFileForUpload = async (file: File): Promise<{ filename: string; buffer: Buffer }> => {
  const filename = file.name.toLowerCase().replace(/[^a-z0-9]/gi, '_');

  // Read the file buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  return { filename, buffer };
};
