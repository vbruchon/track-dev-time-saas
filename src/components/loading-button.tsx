import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode;
  variants?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LoadingButton = ({
  loading,
  children,
  className,
  variants = "default",
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || props.disabled}
      className={cn("w-full mb-2", className)}
      variant={variants}
      {...props}
    >
      {loading ? (
        <>
          <Loader className="animate-spin mr-2 inline-block" size={16} />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
