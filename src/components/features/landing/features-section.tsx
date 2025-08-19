"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, ChartColumn, LockKeyhole, Save, Settings } from "lucide-react";
import { LandingSectionWrapper } from "./landing-section-wrapper";
import { createElement } from "react";

type FeatureItem = {
  title: string;
  description: string;
};

type FeaturesContent = {
  content: {
    badge: string;
    title: string;
    items: FeatureItem[];
  };
};

const getFeatures = (items: FeatureItem[]) => {
  const icons = [Settings, Brain, Save, LockKeyhole, Settings, ChartColumn];

  return items.map((item: FeatureItem, index: number) => ({
    ...item,
    icon: createElement(icons[index] || Settings, { className: "text-3xl" }),
  }));
};

export const FeaturesSection = ({ content }: FeaturesContent) => {
  const features = getFeatures(content.items);
  return (
    <LandingSectionWrapper
      title={content.title}
      badge={content.badge}
      id="features"
      className="max-w-6xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {features.map((feature) => (
          <motion.div key={feature.title} className="h-full">
            <Card className="h-full flex flex-col">
              <CardContent className="px-6 py-4 flex flex-col items-start gap-4 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-start flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <Card className="h-full">
              <CardContent className="px-6 py-4 flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-start">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div> */}
    </LandingSectionWrapper>
  );
};
