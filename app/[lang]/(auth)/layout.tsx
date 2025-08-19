"use client";

import { AuthFormWrapperSkeleton } from "@/components/features/auth/auth-form-wrapper-skeleton";
import { ReactNode, Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Suspense fallback={<AuthFormWrapperSkeleton />}>
        <div className="w-lg max-h-screen overflow-auto">{children}</div>
      </Suspense>
    </div>
  );
}
