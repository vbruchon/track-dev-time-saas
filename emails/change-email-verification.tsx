import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Link, Section, Text } from "@react-email/components";

interface ChangeEmailVerificationProps {
  redirectTo: string;
  userName?: string;
  newEmail: string;
}

export const ChangeEmailVerification = ({
  redirectTo,
  userName = "there",
  newEmail = "your-new-email@example.com",
}: ChangeEmailVerificationProps) => (
  <EmailLayout preview="Confirm your email change for Track Dev Time">
    <Heading className="text-2xl font-bold mt-12 text-foreground">
      Confirm your email change
    </Heading>

    <Section className="my-6 leading-6">
      <Text>Hi {userName},</Text>
      <Text>
        We received a request to change the email address for your Track Dev
        Time account to:
      </Text>
      <Text className="font-semibold text-foreground">{newEmail}</Text>
      <Text>
        If you made this request, please confirm it by clicking the link below:
      </Text>
      <Link href={redirectTo} className="text-primary text-lg font-medium">
        👉 Confirm Email Change 👈
      </Link>
      <Text>
        If you did not request this change, you can safely ignore this email —
        your email address will remain unchanged.
      </Text>
    </Section>

    <Text className="text-sm leading-6">
      Thanks, <br />
      The Track Dev Time Team 👨‍💻
    </Text>
  </EmailLayout>
);

export default ChangeEmailVerification;
