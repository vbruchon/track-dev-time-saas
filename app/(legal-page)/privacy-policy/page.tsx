import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/features/dashboard/mdx/mdx-components";

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "content", "privacy-policy.mdx");
  const source = await fs.readFile(filePath, "utf8");

  return (
    <div className="container mx-auto">
      <MDXRemote source={source} components={MDXComponents} />
    </div>
  );
}
