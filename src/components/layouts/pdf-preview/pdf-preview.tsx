'use client'

import { supabase } from '@/supabase'
import React, { useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'

export const PDFPreview = () => {
  const [imgs, setImgs] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const { data: pdf_imgs, error } = await supabase
        .from('pdf_imgs')
        .select('*')
        .eq('pdf_id', '8927db8d-2f86-4e01-9bb0-013d7f8c1eec')
      setImgs(pdf_imgs?.map(pdf_img => pdf_img.file_url) as string[])
    })()
  }, [])
  return (
    <div className="flipbook-container mt-20">
      {/* @ts-ignore */}
      <HTMLFlipBook
        width={500}
        height={700}
        size="fixed"
        minWidth={300}
        maxWidth={600}
        minHeight={400}
        maxHeight={800}
        maxShadowOpacity={0.1}
        showCover={true}
        mobileScrollSupport={true}
        className="flipbook"
        style={{ margin: '0 auto' }}
      >
        {imgs.map(img => (
          <div className="flipbook-page select-none border-border">
            <img
              src={img}
              className="w-full h-full"
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  )
}
