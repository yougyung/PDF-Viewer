import Viewer from '../../common/viewer/viewer';
import { GlobalWorkerOptions } from 'pdfjs-dist';

const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
GlobalWorkerOptions.workerSrc = PDFJS_WORKER;

function PdfTool({ pdf }: { pdf: File }) {
  return (
    <>
      <Viewer file={pdf} />
    </>
  );
}

export default PdfTool;
