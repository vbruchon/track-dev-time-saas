import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/features/dashboard/mdx/mdx-composants";
import { TableOfContents } from "@/components/features/dashboard/docs/table-of-content";

export default async function DocsPage() {
  const filePath = path.join(process.cwd(), "content", "docs.mdx");
  const source = await fs.readFile(filePath, "utf8");

  return (
    <div className="container mx-auto flex gap-8">
      <aside className="hidden md:block w-64">
        <TableOfContents />
      </aside>

      <article className="prose flex-1">
        <MDXRemote source={source} components={MDXComponents} />
      </article>
    </div>
  );
}
