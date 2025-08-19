"use client";

import { motion } from "framer-motion";
import { PricingCard } from "../dashboard/subscribe/pricing-card";
import { LandingSectionWrapper } from "./landing-section-wrapper";

type PricingFeatures = {
  title: string;
  price: number;
  billingInterval: "month" | "year";
  showButton: boolean;
  features: string[];
};

type PricingContent = {
  content: {
    badge: string;
    title: string;
    description: string;
    items: PricingFeatures[];
  };
};
export function PricingSection({ content }: PricingContent) {
  return (
    <LandingSectionWrapper
      title={content.title}
      badge={content.badge}
      id="pricing"
    >
      <motion.p
        className="text-muted-foreground mb-12 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {content.description}
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {content.items.map((item) => (
          <PricingCard
            key={item.billingInterval}
            heading={item.title}
            price={item.price}
            billingInterval={item.billingInterval}
            showButton={false}
            features={item.features}
          />
        ))}
      </motion.div>
    </LandingSectionWrapper>
  );
}
