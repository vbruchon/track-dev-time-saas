"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("article h2[id]"));

    const items = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.replace("H", ""), 10),
    }));

    setToc(items);

    const updateHash = () => {
      setActiveId(window.location.hash.replace("#", ""));
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const handleClick = (id: string) => () => {
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 max-h-[80vh] overflow-y-auto p-4 border border-l-2 border-muted rounded-md"
    >
      <h2 className="font-semibold mb-2">Sommaire</h2>
      <ul className="space-y-1">
        {toc.map(({ id, text, level }) => (
          <li key={id} className="text-sm">
            <Link
              href={`#${id}`}
              onClick={handleClick(id)}
              className={cn(
                "block border-l py-1.5 hover:text-primary transition-colors",
                activeId === id
                  ? "text-primary font-semibold border-primary"
                  : "text-foreground"
              )}
              style={{
                paddingInlineStart: `${Math.max(level - 1, 0) * 0.75}rem`,
              }}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
