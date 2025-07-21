"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface EditableAvatarFieldProps {
  initialImage: string;
  fallback?: string;
  onChange: (newValue: string | number) => void;
  type?: "text" | "url" | "number";
  placeholder?: string;
}

export const EditableAvatarField = ({
  initialImage,
  fallback = "U",
  type,
  onChange,
  placeholder,
}: EditableAvatarFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState(initialImage);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="relative group">
          <Avatar className="h-24 w-24">
            <AvatarImage src={previewUrl} />
            <AvatarFallback className="text-4xl">{fallback}</AvatarFallback>
          </Avatar>

          <div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <Pencil className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {isEditing && (
        <>
          <FormLabel className="mt-4 block">Image URL</FormLabel>
          <FormControl>
            <Input
              autoFocus
              type={type}
              value={previewUrl}
              placeholder={placeholder}
              onChange={(e) => {
                const val = e.target.value;
                onChange(val);
                setPreviewUrl(val);
              }}
            />
          </FormControl>
          <FormMessage />
        </>
      )}
    </>
  );
};
