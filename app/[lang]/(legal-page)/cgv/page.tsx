import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/features/dashboard/mdx/mdx-components";

export default async function CGVPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const filePath = path.join(
    process.cwd(),
    "content",
    "locales",
    lang,
    "cgv.mdx"
  );
  const source = await fs.readFile(filePath, "utf8");

  return (
    <div className="container mx-auto">
      <MDXRemote source={source} components={MDXComponents} />
    </div>
  );
}
