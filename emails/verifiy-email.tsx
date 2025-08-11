import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Link, Section, Text } from "@react-email/components";

interface VerifyEmailProps {
  verificationLink?: string;
  userName?: string;
}

export const VerifyEmail = ({
  verificationLink,
  userName = "there",
}: VerifyEmailProps) => (
  <EmailLayout preview="Verify your email for Track Dev Time">
    <Heading className="text-3xl font-bold mt-12">
      Verify your email address
    </Heading>

    <Section className="my-6 leading-6">
      <Text>Hi {userName},</Text>
      <Text>
        Welcome to Track Dev Time! Please confirm your email address by clicking
        the link below:
      </Text>
      <Link
        href={verificationLink}
        className="text-primary text-lg font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        👉 Verify My Email 👈
      </Link>
      <Text>
        This link will expire in 24 hours. If you did not create an account, you
        can safely ignore this email.
      </Text>
    </Section>

    <Text className="text-sm leading-6">
      Thanks, <br />
      The Track Dev Time Team 👨‍💻
    </Text>
  </EmailLayout>
);

export default VerifyEmail;
