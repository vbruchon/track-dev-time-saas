"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandingSectionWrapper } from "./landing-section-wrapper";

const faqItems = [
  {
    value: "how-work",
    question: "How does the tracking work?",
    answer:
      "You install a small Node.js package on your project. Once set up, it runs in the background and automatically detects when you're actively working on your development projects. No timers, no clicks—just seamless tracking based on your real coding activity. You'll get clear productivity insights, session history, and project timelines, all without manual input.",
  },
  {
    value: "trial",
    question: "Do I need a credit card for the free trial?",
    answer:
      "No credit card is required. You get full access to the Pro features for 7 days without any commitment.",
  },
  {
    value: "pricing",
    question: "What happens after the trial ends?",
    answer:
      "You can choose a Pro plan (monthly or yearly). If you don’t subscribe, your tracking will pause but your data is saved.",
  },
  {
    value: "cancel",
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Subscriptions can be cancelled directly from your dashboard, no questions asked.",
  },
  {
    value: "features",
    question: "What’s included in the Pro plan?",
    answer:
      "Full automatic time tracking, detailed analytics, productivity insights, project history, and access to new features as they roll out.",
  },
];

export function FaqSection() {
  return (
    <LandingSectionWrapper
      title="Frequently Asked Questions"
      badge="FAQ"
      className="max-w-4xl"
      id="faq"
    >
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent className="text-start">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </LandingSectionWrapper>
  );
}
