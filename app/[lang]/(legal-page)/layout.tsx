import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import React, { ReactNode } from "react";

type LegalLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LegalLayout({
  children,
  params,
}: LegalLayoutProps) {
  const { lang } = (await params) ?? "en";

  return (
    <>
      <Header lang={lang} />
      <main className="min-h-screen p-8 md:p-16">
        <article className="max-w-3xl mx-auto shadow-md rounded-md p-8">
          {children}
        </article>
      </main>
      <Footer lang={lang} />
    </>
  );
}
