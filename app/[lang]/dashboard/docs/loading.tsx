"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDocsPage() {
  return (
    <div className="container mx-auto flex gap-8">
      {/* Sidebar Table of Contents skeleton */}
      <aside className="hidden md:block w-64 h-fit space-y-3 py-4 px-3 bg-muted mt-16 rounded-md">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-full rounded-md" />
        ))}
      </aside>

      {/* Article skeleton */}
      <article className="prose flex-1 space-y-8 animate-pulse">
        {/* Main title */}
        <h1 className="text-4xl font-semibold">Documentation</h1>
        <Skeleton className="h-4 w-full max-w-[90%] rounded-md" />
        {/* Section title */}
        <Skeleton className="h-8 w-1/4 rounded-md" />
        {/* Paragraph */}
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={`para1-${i}`}
            className="h-4 w-full max-w-[90%] rounded-md"
          />
        ))}
        {/* List */}
        <div className="space-y-2 pl-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={`list1-${i}`}
              className="h-4 w-full max-w-[70%] rounded-md"
            />
          ))}
        </div>
        {/* Section title */}
        <Skeleton className="h-8 w-1/4 rounded-md" />
        {/* Paragraph */}
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={`para2-${i}`}
            className="h-4 w-full max-w-[90%] rounded-md"
          />
        ))}
        {/* Code blocks */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={`code-${i}`}
              className="h-10 w-full max-w-[60%] rounded-md bg-slate-700"
            />
          ))}
        </div>
        {/* Section title */}
        <Skeleton className="h-8 w-1/4 rounded-md" />
        {/* Paragraph */}
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={`para3-${i}`}
            className="h-4 w-full max-w-[90%] rounded-md"
          />
        ))}
        {/* Another list */}
        <div className="space-y-2 pl-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={`list2-${i}`}
              className="h-4 w-full max-w-[65%] rounded-md"
            />
          ))}
        </div>
        {/* Large block simulating an image or complex content */}
        <Skeleton className="h-48 w-full rounded-md" />
      </article>
    </div>
  );
}
