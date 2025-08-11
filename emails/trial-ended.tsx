import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Link, Section, Text } from "@react-email/components";

interface TrialEndedProps {
  userName?: string;
  userEmail?: string;
}

export const TrialEnded = ({
  userName = "there",
  userEmail = "user@example.com",
}: TrialEndedProps) => (
  <EmailLayout preview="Your Track Dev Time trial just ended — keep going 💪">
    <Heading className="text-xl font-bold mt-12 text-foreground">
      🛑 Your free trial just ended — let’s keep going 💪
    </Heading>

    <Section className="my-6 text-lg leading-6">
      <Text>Hi {userName || userEmail},</Text>

      <Text>
        Your free trial of <strong>Track Dev Time</strong> just ended.
      </Text>

      <Text>But no worries — your data’s still here, waiting for you.</Text>

      <Text>
        Upgrade to <strong>Pro</strong> and pick up right where you left off.
        Let’s keep crushing those dev sessions together 🚀
      </Text>

      <Link
        href="https://trackdevtime.com/subscribe"
        className="inline-block mt-4 text-primary text-lg font-semibold underline"
      >
        Go Pro →
      </Link>
    </Section>

    <Text className="text-sm leading-6">
      Talk soon, <br />
      The Track Dev Time team 👨‍💻
    </Text>
  </EmailLayout>
);

export default TrialEnded;
