import { useState } from 'react';

export type FileType = File | null;

export default function usePdfFile() {
  const [file, setFile] = useState<FileType>(null);

  const validatePdf = (file: File): boolean => {
    return file.type === 'application/pdf';
  };

  const changeFile = (file: File) => {
    if (validatePdf(file)) setFile(file);
  };

  return { file, changeFile, validatePdf };
}
