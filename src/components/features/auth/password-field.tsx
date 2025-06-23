import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { UseFormReturn, Path } from "react-hook-form";

export const PasswordField = <T extends { password?: string }>({
  disabled,
  form,
  mode = "signin",
}: {
  disabled: boolean;
  form: UseFormReturn<T>;
  mode?: "signin" | "signup";
}) => {
  const passwordField = (
    <FormField
      control={form.control}
      name={"password" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Enter your password"
              disabled={disabled}
              aria-label="Password"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  if (mode === "signin") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="password"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-2"
        >
          {passwordField}
          <Link
            className="text-xs text-indigo-500 ml-2 hover:underline"
            href="/reset-password"
          >
            Forgot password ?
          </Link>
        </motion.div>
      </AnimatePresence>
    );
  }
  return passwordField;
};
