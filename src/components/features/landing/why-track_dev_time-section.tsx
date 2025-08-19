"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChartSpline, LaptopMinimalCheck, Settings, Timer } from "lucide-react";
import { LandingSectionWrapper } from "./landing-section-wrapper";
import { createElement } from "react";

type WhyChooseItem = {
  title: string;
  description: string;
};

type WhyChooseContent = {
  content: {
    title: string;
    items: WhyChooseItem[];
  };
};

const getContent = (items: WhyChooseItem[]) => {
  const icons = [Timer, LaptopMinimalCheck, ChartSpline];

  return items.map((item: WhyChooseItem, index: number) => ({
    ...item,
    icon: createElement(icons[index] || Settings, { className: "text-3xl" }),
  }));
};

export function WhyTrackDevTime({ content }: WhyChooseContent) {
  const comparisons = getContent(content.items);
  return (
    <LandingSectionWrapper title={content.title}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {comparisons.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </LandingSectionWrapper>
  );
}
