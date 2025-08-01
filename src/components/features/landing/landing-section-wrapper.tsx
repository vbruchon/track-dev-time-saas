"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export type LandingSectionWrapperProps = {
  id?: string;
  title: string;
  badge?: string;
  className?: string;
  children: ReactNode;
};

export const LandingSectionWrapper = ({
  id,
  title,
  badge,
  className,
  children,
}: LandingSectionWrapperProps) => {
  return (
    <section id={id} className="w-full py-24">
      <div className={cn("container mx-auto px-4 text-center", className)}>
        {badge && (
          <div className="my-6">
            <Badge variant={"outline"}>{badge}</Badge>
          </div>
        )}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        {children}
      </div>
    </section>
  );
};
