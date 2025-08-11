import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Section, Text } from "@react-email/components";

interface SupportRequeicationProps {
  message?: string;
  userEmail?: string;
}

export const SupportNotification = ({
  message = "I'm having trouble logging into my account.",
  userEmail = "user@example.com",
}: SupportRequeicationProps) => (
  <EmailLayout preview="New support request on Track Dev Time">
    <Heading className="text-2xl font-bold mt-12">
      🛠️ New Support Request
    </Heading>

    <Section className="my-6 text-lg leading-6">
      <Text>
        You’ve received a new support request from{" "}
        <span className="font-semibold">{userEmail}</span>:
      </Text>

      <Section className="p-4 my-4 border border-primary rounded-lg bg-primary/5">
        <Text className="italic">&quot;{message}&quot;</Text>
      </Section>

      <Text>You can reply directly to this email to contact the user.</Text>
    </Section>
  </EmailLayout>
);

export default SupportNotification;
