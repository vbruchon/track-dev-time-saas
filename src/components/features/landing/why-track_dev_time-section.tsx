"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChartSpline, LaptopMinimalCheck, Timer } from "lucide-react";
import { LandingSectionWrapper } from "./landing-section-wrapper";

const comparisons = [
  {
    title: "No more manual time tracking",
    description:
      "Forget starting and stopping timers. Track Dev Time logs your sessions automatically, so you can stay focused on code, not on buttons.",
    icon: <Timer />,
  },
  {
    title: "Built for developers",
    description:
      "Track Dev Time runs quietly in your dev environment. It understands when you're actually coding—not just when your editor is open.",
    icon: <LaptopMinimalCheck />,
  },
  {
    title: "Stay consistent & motivated",
    description:
      "Your dashboard helps you stay on track with weekly goals and visual trends. It's like having a productivity coach—without the meetings.",
    icon: <ChartSpline />,
  },
];

export function WhyTrackDevTime() {
  return (
    <LandingSectionWrapper title="Why choose Track Dev Time?">
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
