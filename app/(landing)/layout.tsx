import { ReactNode } from "react";
import { Header } from "@/components/header";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center px-6 py-16">
        {children}
      </main>
    </>
  );
}
