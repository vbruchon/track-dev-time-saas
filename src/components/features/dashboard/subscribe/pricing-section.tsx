"use client";

import { useState } from "react";
import { PricingCard } from "./pricing-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type BillingInterval = "month" | "year";

type PricingSectionProps = {
  monthlyLabel: string;
  yearlyLabel: string;
  features: string[];
};
export const PricingSection = ({
  monthlyLabel,
  yearlyLabel,
  features,
}: PricingSectionProps) => {
  const [billing, setBilling] = useState<BillingInterval>("month");

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <Label
          htmlFor="billing-switch"
          className={cn(
            "text-base transition-all",
            billing === "month"
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          )}
        >
          {monthlyLabel}
        </Label>

        <Switch
          id="billing-switch"
          checked={billing === "year"}
          onCheckedChange={(checked) => setBilling(checked ? "year" : "month")}
        />

        <Label
          htmlFor="billing-switch"
          className={cn(
            "text-base transition-all",
            billing === "year"
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          )}
        >
          {yearlyLabel}
        </Label>
      </div>

      <div className="flex justify-center gap-6">
        <PricingCard
          key={billing}
          heading="Pro"
          price={billing === "month" ? 7 : 70}
          discount={billing === "year" ? 17 : undefined}
          billingInterval={billing}
          features={features}
        />
      </div>
    </section>
  );
};
