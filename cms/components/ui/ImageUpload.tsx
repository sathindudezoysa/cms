"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration errors by ensuring this only renders on client
  useState(() => {
    setIsMounted(true);
  });

  if (!isMounted) return null;

  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
      {/* 1. Preview the image if it exists */}
      {value && (
        <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
          <Image fill style={{ objectFit: "cover" }} alt="Upload" src={value} />
        </div>
      )}

      {/* 2. The Cloudinary Upload Button */}
      <CldUploadButton
        onSuccess={(result: any) => {
          // When upload is done, we get the public URL here
          onChange(result.info.secure_url);
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        options={{
          maxFiles: 1,
        }}
      >
        <div className="bg-slate-900 text-white p-3 rounded-md cursor-pointer hover:bg-slate-800 transition">
          {value ? "Change Image" : "Upload Image"}
        </div>
      </CldUploadButton>
    </div>
  );
}
