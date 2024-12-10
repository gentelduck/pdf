"use client";

import { Button } from "@/components/ui/button";
import {
  Upload,
  UploadContent,
  UploadInput,
  UploadProvider,
  UploadTrigger,
} from "@/components/ui/upload";
import { UploadIcon } from "lucide-react";
import { generatePDF } from ".";
import { PDFPreview } from "../pdf-preview/pdf-preview";

export const GenPDFForm = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <form>
        <Upload
          trigger={
            <UploadTrigger>
              <Button
                variant="outline"
                type="button"
                icon={{
                  children: UploadIcon,
                }}
              >
                Upload Images
              </Button>
            </UploadTrigger>
          }
          content={
            <div className="flex flex-col h-full gap-4">
              <UploadInput />
              <UploadContent />
            </div>
          }
        />
      </form>
    </div>
  );
};
