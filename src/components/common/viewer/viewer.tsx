import { useEffect, useRef } from 'react';
import { getDocument } from 'pdfjs-dist';
import './viewer.scss';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';

interface ViewerProp {
  file: File;
}

export default function Viewer({ file }: ViewerProp) {
  const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
  GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadPdf = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const pdf = await getDocument(uint8Array).promise;

      clearContainer();
      await renderAllPages(pdf);
    } catch (error) {
      console.error('PDF 로드 오류:', error);
    }
  };

  const clearContainer = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  const renderAllPages = async (pdf: PDFDocumentProxy) => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      await renderPage(page);
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

  const initializeCanvas = (width: number, height: number): HTMLCanvasElement | null => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  };

  loadPdf(file);

  return <div className="Viewer" ref={containerRef}></div>;
}