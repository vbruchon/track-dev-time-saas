import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export type VerifyEmailButtonProps = {
  isVerified: boolean;
  email: string;
  dict: {
    verified: string;
    unverified: string;
    verifyBadge: string;
    toast: {
      success: string;
      error: string;
    };
  };
};

export const VerifyEmailButton = ({
  isVerified,
  email,
  dict,
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
          toast.success(dict.toast.success);
        } catch {
          toast.error(dict.toast.error);
        }
      }}
    >
      {dict.verifyBadge}
    </Badge>
  );
};
