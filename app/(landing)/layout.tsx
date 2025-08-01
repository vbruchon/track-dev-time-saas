import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center p-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
