import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Link, Section, Text } from "@react-email/components";

interface MagicLinkEmailProps {
  magicLink?: string;
}

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => (
  <EmailLayout preview="Log in with this magic link.">
    <Heading className="text-lg font-bold mt-12 text-foreground">
      🪄 Your magic link
    </Heading>
    <Section className="my-6">
      <Text className="text-lg leading-6">
        <Link href={magicLink} className="text-primary text-lg font-medium">
          👉 Click here to sign in 👈
        </Link>
      </Text>
      <Text className="text-lg leading-6">
        If you didn&apos;t request this, please ignore this email.
      </Text>
    </Section>
    <Text className="text-lg leading-6">Track-dev-time Team</Text>
  </EmailLayout>
);

export default MagicLinkEmail;
