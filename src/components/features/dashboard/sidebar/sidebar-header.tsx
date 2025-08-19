"use client";

import { Button } from "@/components/ui/button";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export const DashboardSidebarHeader = () => {
  const { state, toggleSidebar } = useSidebar();
  return (
    <SidebarHeader
      className={cn(
        "items-center",
        state === "collapsed" ? "flex-col-reverse" : "flex"
      )}
    >
      <Image src={"/logo.png"} width={50} height={50} alt="logo" />
      {state === "expanded" && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-semibold"
        >
          Track-Dev-Time
        </motion.span>
      )}
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <ChevronLeft
          className={cn("transition-transform", {
            "rotate-180": state === "collapsed",
          })}
        />
      </Button>
    </SidebarHeader>
  );
};
