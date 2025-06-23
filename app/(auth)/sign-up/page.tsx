import { SignUpForm } from "@/components/features/auth/signup-form";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";
import { SocialAuthButton } from "@/components/features/auth/social-auth-button";

export default function SignUpPage() {
  return (
    <AuthFormWrapper
      title="Sign up Track-dev-time"
      description="We just need a few details to get you started."
    >
      <SignUpForm />
      <div className="flex items-center gap-4 my-6">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <SocialAuthButton provider="github" />
        <SocialAuthButton provider="google" />
      </div>
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-xs mt-4">
          Already have an account?{" "}
          <Link className="text-indigo-500" href="/auth/sign-in">
            Sign In.
          </Link>
        </p>
      </CardFooter>
    </AuthFormWrapper>
  );
}
