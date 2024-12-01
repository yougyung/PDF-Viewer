import { PDFDocumentProxy, TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';
import { loadPdf } from '../../utils/pdfjs';

const TARGET_PATTERN = '신·구조문대비표';
const BASE_X_POSITION = 300;
type PdfPageType = (TextItem | TextMarkedContent)[];

const parseTargetPart = async (pdf: PDFDocumentProxy) => {
  const pages: PdfPageType[] = [];
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

const parsingText = (pages: PdfPageType[]) => {
  const parsedPages: string[][][] = [];

  pages.forEach((page) => {
    let parsedPage: string[][] = [];
    let left: string[] = [];
    let right: string[] = [];

    page.forEach((item) => {
      if (!('transform' in item)) return;

      const xPosition = item.transform[4];
      if (xPosition < BASE_X_POSITION && right.length === 0) {
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

const initializeParser = async (file: File) => {
  try {
    const pdf = await loadPdf(file);
    const pages = await parseTargetPart(pdf);
    const parsedText = parsingText(pages);
    console.log(parsedText);
  } catch (error) {
    console.error('pdf parser error', error);
  }
};

interface ParserProp {
  file: File;
}

export default function Parser({ file }: ParserProp) {
  initializeParser(file);

  return <div>parsing결과는 conosle창에서 확인가능합니다.</div>;
}
