"use client";
import { PDFPreview } from "@/components/layouts/pdf-preview/pdf-preview";

export default function Preview() {
  return (
    <div className="flex flex-col place-content-center">
      <PDFPreview pdfFile="https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/category__imgs/seo%20report%20goods.pdf?t=2024-12-08T17%3A34%3A30.076Z" />
    </div>
  );
}
