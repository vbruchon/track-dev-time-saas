// app/(legal)/layout.tsx (Next.js 13+ app router example)
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import React, { ReactNode } from "react";

type LegalLayoutProps = {
  children: ReactNode;
};

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen p-8 md:p-16">
        <article className="max-w-3xl mx-auto shadow-md rounded-md p-8">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
