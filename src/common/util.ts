export const getExtensionOfFilename = (filename: string) => {
  const len = filename.length;
  const lastDot = filename.lastIndexOf(".");
  return filename.substring(lastDot, len).toLowerCase();
};
