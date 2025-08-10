"use client";

import { motion } from "framer-motion";
import { PricingCard } from "../dashboard/subscribe/pricing-card";
import { LandingSectionWrapper } from "./landing-section-wrapper";

export function PricingSection() {
  return (
    <LandingSectionWrapper
      title="Simple, transparent pricing"
      badge="Pricing"
      id="pricing"
    >
      <motion.p
        className="text-muted-foreground mb-12 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Start with a 7-day free trial. No credit card required. Cancel anytime.
        Explore all features. Upgrade later if you like it.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <PricingCard
          heading="Pro Monthly"
          price={7}
          billingInterval="month"
          showButton={false}
        />
        <PricingCard
          heading="Pro Yearly"
          price={70}
          billingInterval="year"
          discount={17}
          showButton={false}
        />
      </motion.div>
    </LandingSectionWrapper>
  );
}
