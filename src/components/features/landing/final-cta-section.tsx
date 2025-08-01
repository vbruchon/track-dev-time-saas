"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { LandingSectionWrapper } from "./landing-section-wrapper";

export function FinalCtaSection() {
  return (
    <LandingSectionWrapper
      title="Ready to track your dev time effortlessly ?"
      className="max-w-4xl"
    >
      <>
        <motion.p
          className="text-muted-foreground mb-8 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Start your 7-day free trial and experience what automated time
          tracking feels like <br />
          no card, no stress, just results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/auth/register">
            <Button size="lg" variant={"cta"} className="text-base px-8 py-6">
              Start your free trial
            </Button>
          </Link>
        </motion.div>
      </>
    </LandingSectionWrapper>
  );
}
