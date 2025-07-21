import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export type VerifyEmailButtonProps = {
  isVerified: boolean;
  email: string;
};

export const VerifyEmailButton = ({
  isVerified,
  email,
}: VerifyEmailButtonProps) => {
  if (isVerified) return null;

  return (
    <Badge
      variant="outline"
      className="hover: cursor-pointer"
      onClick={async () => {
        try {
          await authClient.sendVerificationEmail({
            email,
            callbackURL: "/dashboard",
          });
          toast.success("Verification email sent.");
        } catch {
          toast.error("Failed to send verification email.");
        }
      }}
    >
      Verify your email
    </Badge>
  );
};
