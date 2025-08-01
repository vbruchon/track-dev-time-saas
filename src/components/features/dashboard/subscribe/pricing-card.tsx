import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { PricingFeatureItem } from "./pricing-feature-item";
import { upgradeSubscription } from "@/lib/actions/create-stripe-checkout.action";

export type PricingCardProps = {
  heading: string;
  price: number;
  discount?: number;
  billingInterval: "month" | "year";
  showButton?: boolean;
};

export const PricingCard = ({
  heading,
  price,
  discount,
  billingInterval,
  showButton = true,
}: PricingCardProps) => {
  const fullPrice =
    billingInterval === "year" ? price / (1 - discount / 100) : price;

  const formattedFullPrice = Math.round(fullPrice);

  const features = [
    "Unlimited tracked",
    "Visual dashboard &stats",
    "Priority support",
  ];

  return (
    <Card className="relative w-full min-w-56 max-w-xs overflow-hidden transition duration-300 px-2">
      <CardHeader>
        <div className="relative flex items-center justify-between ">
          <CardTitle className="text-xl">{heading}</CardTitle>
          {discount && (
            <div className="origin-center-right absolute right-[-55%] top-0 w-full -translate-x-6 translate-y-4 rotate-45 bg-gradient-to-r from-slate-600 to-slate-700 text-center text-white lg:text-lg">
              {discount}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-end space-x-2">
          {price === 0 ? (
            <span className="text-2xl font-bold">7-day free trial</span>
          ) : (
            <span className="text-3xl font-bold">{price} €</span>
          )}
          {discount && (
            <span className="text-gray-400 line-through md:text-lg lg:text-xl xl:text-2xl">
              {formattedFullPrice} €
            </span>
          )}
          <span className="text-muted-foreground text-sm">
            / {billingInterval}
          </span>
        </div>
        <ul className="space-y-2 text-sm">
          {features.map((feature) => (
            <PricingFeatureItem key={feature}>{feature}</PricingFeatureItem>
          ))}
        </ul>
        {showButton && (
          <form action={upgradeSubscription}>
            <input type="hidden" name="billing" value={billingInterval} />
            <button
              type="submit"
              className="bg-primary py-2 px-4 flex items-center justify-center text-sm cursor-pointer text-muted rounded-md w-full hover:bg-primary/80 hover:scale-105"
            >
              <Rocket className="size-5 mr-2" />
              Upgrade to Pro
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
