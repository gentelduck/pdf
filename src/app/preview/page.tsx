"use client";
import { PDFPreview } from "@/components/layouts/pdf-preview/pdf-preview";

export default function Preview() {
  return (
    <div className="flex flex-col place-content-center overflow-hidden">
      <PDFPreview />
    </div>
  );
}
