"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { LandingSectionWrapper } from "./landing-section-wrapper";

type FinalCtaContent = {
  content: {
    title: string;
    paragraph: string;
    cta: string;
    href: string;
  };
};

export function FinalCtaSection({ content }: FinalCtaContent) {
  return (
    <LandingSectionWrapper title={content.title} className="max-w-4xl">
      <>
        <motion.p
          className="text-muted-foreground mb-8 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {content.paragraph}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href={content.href}>
            <Button size="lg" variant="cta" className="text-base px-8 py-6">
              {content.cta}
            </Button>
          </Link>
        </motion.div>
      </>
    </LandingSectionWrapper>
  );
}
