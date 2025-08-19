import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";
import { getDictionary } from "@/locales/dictionaries";

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "auth/sign-in");
  return (
    <AuthFormWrapper title={dict.verify.title}>
      <p className="mt-4 text-center">{dict.verify.content}</p>
    </AuthFormWrapper>
  );
}
