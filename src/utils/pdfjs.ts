import { GlobalWorkerOptions } from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

let pdfJsDidInit = false;
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const initializePdfJs = () => {
  if (!pdfJsDidInit) {
    GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  }
};

export const loadPdf = async (file: File) => {
  initializePdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const pdf = await getDocument(uint8Array).promise;
  return pdf;
};
