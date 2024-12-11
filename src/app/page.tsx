"use client";
import { GenPDFForm, Header, ImageGalleryPreview } from "@/components/layouts";
import { UploadProvider } from "@/components/ui/upload";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/pdf.worker.min.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((err) =>
          console.error("Service Worker Registration Failed:", err)
        );
    }
  }, []);
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full container">
      <UploadProvider>
        <GenPDFForm />
        <ImageGalleryPreview />
      </UploadProvider>
    </main>
  );
}
