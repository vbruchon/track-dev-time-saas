import { SignUpForm } from "@/components/features/auth/signup-form";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";
import { SocialAuthButton } from "@/components/features/auth/social-auth-button";
import { getDictionary } from "@/locales/dictionaries";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "auth/sign-up");

  return (
    <AuthFormWrapper title={dict.title} description={dict.description}>
      <SignUpForm dictForm={dict.form} />
      <div className="flex items-center gap-4 my-6">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{dict.or}</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <SocialAuthButton text={dict.continueWith.github} provider="github" />
        <SocialAuthButton text={dict.continueWith.google} provider="google" />
      </div>
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-xs mt-4">
          {dict.alreadyHaveAccount}{" "}
          <Link className="text-indigo-500" href="/sign-in">
            {dict.signIn}
          </Link>
        </p>
      </CardFooter>
    </AuthFormWrapper>
  );
}
