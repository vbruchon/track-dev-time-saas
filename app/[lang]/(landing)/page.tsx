import { FaqSection } from "@/components/features/landing/faq-section";
import { FeaturesSection } from "@/components/features/landing/features-section";
import { FinalCtaSection } from "@/components/features/landing/final-cta-section";
import { Hero } from "@/components/features/landing/hero";
import { PricingSection } from "@/components/features/landing/pricing-section";
import { WhyTrackDevTime } from "@/components/features/landing/why-track_dev_time-section";
import { getDictionary } from "@/locales/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "landing");

  return (
    <main className="flex flex-col items-center px-4 py-12 sm:py-12 lg:py-16">
      <Hero content={dict.hero} />
      <FeaturesSection content={dict.features} />
      <WhyTrackDevTime content={dict.whyChoose} />
      <PricingSection content={dict.pricing} />
      <FinalCtaSection content={dict.cta} />
      <FaqSection content={dict.faq} />
    </main>
  );
}
