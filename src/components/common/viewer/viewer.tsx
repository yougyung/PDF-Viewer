import { useRef } from 'react';
import './viewer.scss';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { loadPdf } from '../../../utils/pdfjs';

interface ViewerProp {
  file: File;
}

export default function Viewer({ file }: ViewerProp) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clearContainer = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  const renderPage = async (page: PDFPageProxy) => {
    const viewport = page.getViewport({ scale: 1 });

    const containerWidth = containerRef.current?.clientWidth || 0;
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = initializeCanvas(scaledViewport.width, scaledViewport.height);
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };
        await page.render(renderContext).promise;
        containerRef.current?.appendChild(canvas);
      }
    }
  };

  const renderAllPages = async (pdf: PDFDocumentProxy) => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      await renderPage(page);
    }
  };

  const initializeCanvas = (width: number, height: number): HTMLCanvasElement | null => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  };

  const initViewer = async (file: File) => {
    try {
      clearContainer();
      const pdf = await loadPdf(file);
      await renderAllPages(pdf);
    } catch (error) {
      console.error('pdf load error', error);
    }
  };

  initViewer(file);

  return <div className="Viewer" ref={containerRef}></div>;
}
