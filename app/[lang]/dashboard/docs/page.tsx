import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/features/dashboard/mdx/mdx-components";
import { TableOfContents } from "@/components/features/dashboard/docs/table-of-content";
import { CommandsCliTable } from "@/components/features/dashboard/docs/commands-cli-tab";
import { getDictionary } from "@/locales/dictionaries";
import { FAQDocs } from "@/components/features/dashboard/docs/faq-docs";
import { ApiKeyInfoAlert } from "@/components/features/dashboard/docs/api-key-info-alert";
import { ApiKeyFormServer } from "@/components/features/dashboard/mdx/api-key-form-server";

export default async function DocsPage({
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
    "docs.mdx"
  );
  const source = await fs.readFile(filePath, "utf8");

  const dict = await getDictionary(lang, "dashboard/docs");

  return (
    <div className="container mx-auto flex gap-8">
      <aside className="hidden md:block w-64">
        <TableOfContents />
      </aside>

      <article className="prose flex-1">
        <MDXRemote
          source={source}
          components={{
            ...MDXComponents,
            CommandsCliTable: () => (
              <CommandsCliTable commands={dict.cliCommands} />
            ),
            FAQDocs: () => <FAQDocs lang={lang} />,
            ApiKeyInfoAlert: () => (
              <ApiKeyInfoAlert content={dict.apiKeyInfoAlert} />
            ),
            ApiKeyForm: () => <ApiKeyFormServer lang={lang} />,
          }}
        />
      </article>
    </div>
  );
}
