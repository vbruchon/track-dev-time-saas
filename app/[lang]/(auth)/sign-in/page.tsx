import SignInCardForm from "@/components/features/auth/sign-in-card-form";
import { getDictionary } from "@/locales/dictionaries";

export default async function SignInPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "auth/sign-in");

  return <SignInCardForm dict={dict} />;
}
