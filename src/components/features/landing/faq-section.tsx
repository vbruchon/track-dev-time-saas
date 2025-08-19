"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandingSectionWrapper } from "./landing-section-wrapper";

type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

type FaqContent = {
  badge: string;
  title: string;
  items: FaqItem[];
};

type FaqSectionProps = {
  content: FaqContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <LandingSectionWrapper
      title={content.title}
      badge={content.badge}
      className="max-w-4xl"
      id="faq"
    >
      <Accordion type="single" collapsible className="space-y-4">
        {content.items.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent className="text-start leading-relaxed">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </LandingSectionWrapper>
  );
}
