"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { easeOut, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { BadgeBorderAnimated } from "./badge-border-animated";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { delay, duration: 0.2 },
  }),
};

const imageFadeIn = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: easeOut, delay: 0.2 },
  },
};

type HeroPropsType = {
  content: {
    badge: string;
    title: string;
    paragraph: {
      highlight: string;
      text: string;
    };
    cta: string;
    dashboardImageAlt: string;
  };
};

export const Hero = ({ content }: HeroPropsType) => {
  return (
    <>
      <div className="flex flex-col items-center w-full max-w-4xl text-center space-y-6">
        <BadgeBorderAnimated>{content.badge}</BadgeBorderAnimated>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ring to-primary">
            {content.title}
          </span>
        </motion.h1>

        <motion.p
          variants={fade}
          custom={0.2}
          initial="hidden"
          animate="show"
          className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          <span className="font-semibold">{content.paragraph.highlight}</span>{" "}
          {content.paragraph.text}
        </motion.p>

        <motion.div
          variants={fade}
          custom={0.2}
          initial="hidden"
          animate="show"
          className="mt-4 mb-2"
        >
          <Link
            href="/sign-up"
            className={cn(buttonVariants({ size: "lg", variant: "cta" }))}
          >
            {content.cta}
          </Link>
        </motion.div>
      </div>

      <div className="relative max-w-6xl w-full h-full mx-auto mt-12">
        {/* Halo flou autour */}
        <motion.div
          variants={imageFadeIn}
          initial="hidden"
          animate="show"
          className="absolute inset-0 h-[70%] w-full rounded-t-xl -z-10"
        >
          <div className="w-full h-full bg-primary/40 blur-[100px]" />
        </motion.div>

        <motion.div
          variants={imageFadeIn}
          initial="hidden"
          animate="show"
          className="relative rounded-xl overflow-hidden"
        >
          <>
            <Image
              src="/dashboard-screen.png"
              alt={content.dashboardImageAlt}
              width={1200}
              height={800}
              className="dark:hidden block w-full h-auto rounded-xl shadow-lg z-10  
              [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
              [mask-size:100%_100%] 
              [mask-repeat:no-repeat]"
              priority
            />
            <Image
              src="/dashboard-screen-dark.png"
              alt="Track Dev Time dashboard"
              width={1200}
              height={800}
              className="dark:block hidden w-full h-auto rounded-xl shadow-lg z-10  
              [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
              [mask-size:100%_100%] 
              [mask-repeat:no-repeat]"
              priority
            />
          </>
        </motion.div>
      </div>
    </>
  );
};
