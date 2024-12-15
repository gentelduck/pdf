"use client";

import { Button } from "@/components/ui/button";
import {
  Upload,
  UploadContent,
  UploadInput,
  UploadTrigger,
} from "@/components/ui/upload";
import { UploadIcon } from "lucide-react";

export const GenPDFForm = ({ loading }: { loading: boolean }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <form>
        <Upload
          trigger={
            <UploadTrigger>
              <Button
                variant="outline"
                type="button"
                loading={loading}
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
