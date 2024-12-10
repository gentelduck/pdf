"use client";
import React, { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

type PDFImagePreviewProps = {
  pdfFile: string | File;
};

export const PDFPreview = ({ pdfFile }: PDFImagePreviewProps) => {
  const [pages, setPages] = useState<any[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);

  // Set the worker source (required by pdf.js)
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  useEffect(() => {
    if (pdfFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setFile(reader.result);
      reader.readAsDataURL(pdfFile);
    } else {
      setFile(pdfFile);
    }
  }, [pdfFile]);

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    const pagesArray: any[] = [];

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      // Load the page from PDF.js
      const pdf = await pdfjs.getDocument(file).promise;
      const page = await pdf.getPage(pageNumber);

      // Set up the canvas
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the page to the canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        // Convert the canvas to an image (data URL)
        const imgUrl = canvas.toDataURL();

        pagesArray.push(imgUrl);
      }
    }

    setPages(pagesArray);
  };

  return (
    <div>
      {file && (
        <div>
          <div>PDF Pages:</div>
          {pages.length > 0 ? (
            <div>
              {pages.map((pageImgUrl, index) => (
                <img
                  key={index}
                  src={pageImgUrl}
                  alt={`Page ${index + 1}`}
                  style={{ width: "100%", maxWidth: "600px", margin: "10px 0" }}
                />
              ))}
            </div>
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      )}
    </div>
  );
};
