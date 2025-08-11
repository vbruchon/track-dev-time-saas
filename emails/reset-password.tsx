import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Link, Section, Text } from "@react-email/components";

interface ResetPasswordEmailProps {
  resetLink?: string;
  userName?: string;
}

export const ResetPasswordEmail = ({
  resetLink,
  userName = "there",
}: ResetPasswordEmailProps) => (
  <EmailLayout preview="Reset your Track Dev Time password">
    <Heading className="text-2xl font-bold mt-12 text-foreground">
      Reset your password
    </Heading>

    <Section className="my-6 text-lg leading-6">
      <Text>Hi {userName},</Text>
      <Text>
        We received a request to reset the password for your Track Dev Time
        account.
      </Text>
      <Text>
        If you made this request, please reset your password by clicking the
        link below:
      </Text>
      <Link href={resetLink} className="text-primary text-lg font-medium">
        👉 Reset My Password 👈
      </Link>
      <Text>
        If you did not request this change, you can safely ignore this email —
        your password will remain unchanged.
      </Text>
    </Section>

    <Text className="text-sm leading-6">
      Thanks, <br />
      The Track Dev Time Team 👨‍💻
    </Text>
  </EmailLayout>
);

export default ResetPasswordEmail;
