import { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type LandingLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LandingLayout({
  children,
  params,
}: LandingLayoutProps) {
  const { lang } = (await params) ?? "en";
  return (
    <>
      <Header lang={lang} />
      <main className="min-h-screen flex flex-col items-center p-6">
        {children}
      </main>
      <Footer lang={lang} />
    </>
  );
}
