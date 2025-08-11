import EmailLayout from "@/components/features/email/email-layout";
import { Heading, Link, Section, Text } from "@react-email/components";

interface TrialEndingSoonProps {
  userName?: string;
  userEmail?: string;
}

export const TrialEndingSoon = ({
  userName = "there",
  userEmail = "user@example.com",
}: TrialEndingSoonProps) => (
  <EmailLayout preview="Your Track Dev Time trial ends in 2 days ⏳">
    <Heading className="text-2xl font-bold mt-12 text-foreground">
      Only 2 days left — don’t lose your dev flow 🚀
    </Heading>

    <Section className="my-6 leading-6">
      <Text>Hi {userName || userEmail},</Text>

      <Text>
        Your <strong>Track Dev Time</strong> trial wraps up in just{" "}
        <strong>2 days</strong>! ⏳
      </Text>

      <Text>
        If you’ve been enjoying the productivity boost, now’s the time to go{" "}
        <strong>Pro</strong> and keep that momentum going.
      </Text>

      <Text>
        Don’t worry — your data is safe. But you’ll need to upgrade to keep
        tracking your sessions automatically.
      </Text>

      <Link
        href="https://track-dev-time.dev/subscribe"
        className="inline-block mt-4 text-primary text-lg font-semibold underline"
      >
        Upgrade now →
      </Link>
    </Section>

    <Text className="text-sm leading-6">
      Keep shipping, <br />
      The Track Dev Time team 👨‍💻
    </Text>
  </EmailLayout>
);

export default TrialEndingSoon;
