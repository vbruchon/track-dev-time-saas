import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";

export default function VerifyEmailPage() {
  return (
    <AuthFormWrapper title="Please check your email!">
      <p className="mt-4 text-center">
        We just sent you a confirmation email. Please click the link to
        continue.
      </p>
    </AuthFormWrapper>
  );
}
