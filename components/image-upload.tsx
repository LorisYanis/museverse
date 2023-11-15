"use client";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./single-image-dropzone";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  botImageSource?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
  width = 300,
  height = 300,
  botImageSource,
}: ImageUploadProps) => {
  const [image, setImage] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { edgestore } = useEdgeStore();

  const onSubmit = async (image?: File) => {
    if (image) {
      setIsSubmitting(true);
      setImage(image);

      const res = await edgestore.publicFiles.upload({
        file: image,
      });

      onChange(res.url);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <SingleImageDropzone
        width={width}
        height={height}
        value={image || botImageSource}
        onChange={(image?: File) => onSubmit(image)}
        disabled={isSubmitting || disabled}
      />
    </div>
  );
};
