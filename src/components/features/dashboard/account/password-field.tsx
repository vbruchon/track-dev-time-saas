import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleVisibilityButton } from "../button/toogle-visibility-button";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: PasswordFieldProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Input
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <ToggleVisibilityButton value={visible} onToggle={setVisible} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
