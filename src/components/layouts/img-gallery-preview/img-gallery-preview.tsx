"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUploadContext } from "@/components/ui/upload";
import { generatePDF } from "../gen-pdf-form";
import { Button } from "@/components/ui/button";

export type ImageGalleryPreviewProps = {};

export const ImageGalleryPreview = ({}: ImageGalleryPreviewProps) => {
  const { attachments: files } = useUploadContext() ?? {};
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const newPreviews = files.map((file) => {
      if (typeof file.file === "string") {
        // If the file is a URL (e.g., already uploaded)
        return file.file;
      } else {
        // If the file is a File object, generate a URL for preview
        return URL.createObjectURL(file.file as Blob);
      }
    });

    setPreviews(newPreviews);

    // Cleanup URLs when component unmounts or files change
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <div className="w-full h-full">
      <div className="gap-4 p-4 rounded-lg items-center border border-border min-h-[300px] flex flex-col place-content-center">
        {previews.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 p-4 rounded-lg items-center w-full">
            {previews.map((src, index) => (
              <div key={index} className="h-52 relative">
                {/* Use next/image for optimization */}
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center w-full">
            No images uploaded yet.
          </div>
        )}
      </div>
      <Button
        onClick={() => {
          generatePDF({
            previews,
          });
        }}
        className="mt-4"
      >
        Export as PDF
      </Button>
    </div>
  );
};
