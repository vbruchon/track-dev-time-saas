"use client";

import { Button } from "@/components/ui/button";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

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
        <span className="text-lg font-bold text-primary">track-dev-time</span>
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
