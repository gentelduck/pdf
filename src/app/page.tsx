'use client'
import { ImageGalleryPreview } from '@/components/layouts'
import { UploadProvider } from '@/components/ui/upload'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full h-[770px] container mx-auto border-x-border border-x">
      <UploadProvider>
        <ImageGalleryPreview />
      </UploadProvider>
    </main>
  )
}
