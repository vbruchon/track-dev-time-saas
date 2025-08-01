import { FaqSection } from "@/components/features/landing/faq-section";
import { FeaturesSection } from "@/components/features/landing/features-section";
import { FinalCtaSection } from "@/components/features/landing/final-cta-section";
import { Hero } from "@/components/features/landing/hero";
import { PricingSection } from "@/components/features/landing/pricing-section";
import { WhyTrackDevTime } from "@/components/features/landing/why-track_dev_time-section";

export default async function Home() {
  return (
    <main className="flex flex-col items-center px-4 py-12 sm:py-12 lg:py-16">
      <Hero />
      <FeaturesSection />
      <WhyTrackDevTime />
      <PricingSection />
      <FinalCtaSection />
      <FaqSection />
    </main>
  );
}
