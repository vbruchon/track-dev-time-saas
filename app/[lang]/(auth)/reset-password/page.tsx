import ResetPasswordForm from "@/components/features/auth/reset-password-form";
import { getDictionary } from "@/locales/dictionaries";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "auth/sign-in");

  return <ResetPasswordForm dict={dict.reset} />;
}
