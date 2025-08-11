import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Section, Text } from "@react-email/components";

interface FeedbackNotificationProps {
  feedback?: string;
  userEmail?: string;
}

export const FeedbackNotification = ({
  feedback = "This app is awesome!",
  userEmail = "user@example.com",
}: FeedbackNotificationProps) => (
  <EmailLayout preview="New feedback received on Track Dev Time">
    <Heading className="text-2xl font-bold mt-12 text-foreground">
      📩 New Feedback Received
    </Heading>

    <Section className="my-6 text-lg leading-6">
      <Text>
        You’ve received new feedback from{" "}
        <span className="font-semibold">{userEmail}</span>:
      </Text>

      <Section className="p-4 my-4 border border-primary rounded-lg bg-primary/5">
        <Text className="italic text-foreground">&quot;{feedback}&quot;</Text>
      </Section>

      <Text>You can reply directly to this email to contact the user.</Text>
    </Section>
  </EmailLayout>
);

export default FeedbackNotification;
