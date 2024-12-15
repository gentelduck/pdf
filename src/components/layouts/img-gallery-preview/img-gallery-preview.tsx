'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AttachmentType, uploadBlobAndLinkToTable, useUploadContext } from '@/components/ui/upload'
import { GenPDFForm } from '../gen-pdf-form'
import { Button } from '@/components/ui/button'
import { supabase } from '@/supabase'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Check, Copy, Rotate3d } from 'lucide-react'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export type ImageGalleryPreviewProps = {}

export const GenPDF = (props: {
  loading: boolean
  setLoading: any
  pdfFile: string
  previews: string[]
  setPreviews: React.Dispatch<React.SetStateAction<any>>
  files: AttachmentType[]
  setPDFFile: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { loading, setLoading, pdfFile, previews, files, setPDFFile, setPreviews } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <Button
          disabled={previews.length > 0 && !loading ? false : true}
          icon={{ children: Rotate3d }}
          onClick={async () => {
            setLoading(true)

            try {
              // Insert data into "pdfs" table
              const { data: insertedData } = await supabase
                .from('pdfs')
                .insert([
                  {
                    name: 'test',
                  },
                ])
                .select()

              // Upload files and link to inserted ID
              await Promise.all(
                files.map(async attachment => {
                  try {
                    const uploadedFile = await uploadBlobAndLinkToTable(
                      attachment.file ?? new Blob(),
                      attachment.name,
                      insertedData?.[0].id
                    )
                    return uploadedFile
                  } catch (error) {
                    console.error('Error uploading file:', error)
                    // Handle error, e.g., display an error message to the user
                    return null
                  }
                })
              )

              setPDFFile(insertedData?.[0].id as string)
              setOpen(true)
              setLoading(false)
              setPreviews([])
            } catch (error) {
              console.error('Error handling submission:', error)
              setOpen(false)
              setLoading(false)
              throw error
            }
          }}
          loading={loading}
          className="w-[300px]"
        >
          Make PDF
        </Button>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share PDF link</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label
                htmlFor="link"
                className="sr-only"
              >
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`${process.env.NEXT_PUBLIC_SITE_URL}${pdfFile}`}
                readOnly
              />
            </div>
            <CopyButton link={`${process.env.NEXT_PUBLIC_SITE_URL}${pdfFile}`} />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const CopyButton = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      type="submit"
      size="sm"
      className="px-3"
      onClick={() => {
        navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      icon={{ children: copied ? Check : Copy }}
    >
      <span className="sr-only">Copy</span>
    </Button>
  )
}

const GenPDFMemo = React.memo(GenPDF)

export const ImageGalleryPreview = ({}: ImageGalleryPreviewProps) => {
  const { attachments: files } = useUploadContext() ?? {}
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pdfFile, setPDFFile] = useState<string>('')

  useEffect(() => {
    const newPreviews = files.map(file => {
      if (typeof file.file === 'string') {
        // If the file is a URL (e.g., already uploaded)
        return file.file
      } else {
        // If the file is a File object, generate a URL for preview
        return URL.createObjectURL(file.file as Blob)
      }
    })

    setPreviews(newPreviews)

    // Cleanup URLs when component unmounts or files change
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [files])

  return (
    <div className="w-full h-full max-auto gap-4 flex flex-col p-12">
      <GenPDFForm loading={loading} />
      <ScrollArea className="gap-4 p-4 rounded-lg items-start border border-border h-[600px] flex flex-col place-content-start">
        {previews.length > 0 ? (
          <div className="grid grid-cols-8 gap-4 p-4 rounded-lg items-center w-full">
            {previews.map((src, index) => (
              <div
                key={index}
                className="h-52 relative border border-border rounded-lg"
              >
                {/* Use next/image for optimization */}
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-fit rounded-md"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center w-full py-[15rem]">No images uploaded yet.</div>
        )}
      </ScrollArea>
      <GenPDFMemo
        loading={loading}
        setLoading={setLoading}
        pdfFile={pdfFile}
        previews={previews}
        files={files}
        setPDFFile={setPDFFile}
        setPreviews={setPreviews}
      />
    </div>
  )
}
