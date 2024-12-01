import Viewer from '../../common/viewer/viewer';
import { GlobalWorkerOptions } from 'pdfjs-dist';

function PdfTool({ pdf }: { pdf: File }) {
  return (
    <>
      <Viewer file={pdf} />
    </>
  );
}

export default PdfTool;
