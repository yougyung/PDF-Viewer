import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { PDFDocumentProxy, TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
const TARGET_PATTERN = '신·구조문대비표';
const BASE_X_POSITION = 300;

const loadPdf = async (file: File) => {
  GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const pdf = await getDocument(uint8Array).promise;
  return pdf;
};

const parseTargetPart = async (pdf: PDFDocumentProxy) => {
  const pages: (TextItem | TextMarkedContent)[][] = [];
  let isMatched = false;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    const startIndex = textContent.items.findIndex((item) => 'str' in item && item.str.includes(TARGET_PATTERN));
    if (!isMatched && startIndex !== -1) {
      isMatched = true;
      pages.push(textContent.items.slice(startIndex));
    } else if (isMatched) {
      pages.push(textContent.items);
    }
  }
  return pages;
};

const parsingText = (pages: (TextItem | TextMarkedContent)[][]) => {
  let left: string[] = [];
  let right: string[] = [];
  const parsedPages: string[][][] = [];

  pages.forEach((page) => {
    let parsedPage: string[][] = [];

    page.forEach((item) => {
      if (!('transform' in item)) return;

      const xPosition = item.transform[4];
      if (xPosition < BASE_X_POSITION) {
        left.push(item.str);
      } else if (xPosition > BASE_X_POSITION) {
        right.push(item.str);
      } else {
        parsedPage.push([left.join(''), right.join('')]);
        left = [item.str];
        right = [];
      }
    });

    parsedPage.push([left.join(''), right.join('')]);
    parsedPages.push(parsedPage);
  });

  return parsedPages;
};

const parsePdf = async (file: File) => {
  try {
    const pdf = await loadPdf(file);
    const pages = await parseTargetPart(pdf);
    const parsedText = parsingText(pages);
    console.log(parsedText);
  } catch (error) {
    console.error('PDF 처리 중 오류 발생:', error);
  }
};

export default function Parser({ file }: { file: File }) {
  parsePdf(file);

  return <div>parsing결과는 conosle창에서 확인가능합니다.</div>;
}
