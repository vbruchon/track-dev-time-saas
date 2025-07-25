"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";

type EditableFieldPropsType = {
  value: string | number;
  onChange: (newValue: string | number) => void;
  type?: "text" | "url" | "number" | "email";
  placeholder?: string;
  isEditable?: boolean;
};

export const EditableField = ({
  value,
  onChange,
  type = "text",
  placeholder,
  isEditable = true,
}: EditableFieldPropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
  };

  return (
    <div
      className="group relative flex items-center gap-2 min-h-9"
      onMouseEnter={() => !isEditing && setTempValue(value)}
    >
      {isEditing && isEditable ? (
        <Input
          autoFocus
          type={type}
          value={tempValue}
          placeholder={placeholder}
          onChange={(e) => {
            const val =
              type === "number" ? Number(e.target.value) : e.target.value;
            setTempValue(val);
          }}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlur();
            }
          }}
        />
      ) : (
        <div
          className={cn("flex items-center gap-2  w-full", {
            "cursor-pointer": isEditable,
          })}
          onClick={() => setIsEditing(true)}
        >
          <span className="truncate">
            {value || placeholder || "Click to edit"}
          </span>
          {isEditable && (
            <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      )}
    </div>
  );
};
