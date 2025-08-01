"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, ChartColumn, LockKeyhole, Save, Settings } from "lucide-react";
import { LandingSectionWrapper } from "./landing-section-wrapper";

const features = [
  {
    title: "Automatic session tracking",
    description:
      "Just start coding—Track Dev Time automatically detects and logs your sessions when your dev server starts.",
    icon: <Settings />,
  },
  {
    title: "Smart pause & resume",
    description:
      "Step away anytime. The tracker intelligently detects inactivity and adjusts your session in real time.",
    icon: <Brain />,
  },
  {
    title: "Offline-first sync",
    description:
      "Sessions are stored locally in JSON and automatically synced to your dashboard when you close your server.",
    icon: <Save />,
  },
  {
    title: "Secure API key linking",
    description:
      "Each project is linked with a secure API key for safe, hassle-free identification and tracking.",
    icon: <LockKeyhole />,
  },
  {
    title: "Cross-project tracking",
    description:
      "Switch between projects seamlessly. All sessions are grouped and visualized with clarity.",
    icon: <Settings />,
  },
  {
    title: "Motivating dashboard",
    description:
      "Get a clear view of your coding patterns, weekly goals, and historical trends—all in one modern dashboard.",
    icon: <ChartColumn />,
  },
];

export function FeaturesSection() {
  return (
    <LandingSectionWrapper
      title="Powerful features to boost your dev workflow"
      badge="Features"
      id="features"
      className="max-w-6xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </LandingSectionWrapper>
  );
}
