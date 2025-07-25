import { cn } from "@/lib/utils";
import Link from "next/link";
import { CodeBlock } from "../docs/code-block";
import { CommandsCliTable } from "../docs/commands-cli-tab";
import { FAQDocs } from "../docs/faq-docs";
import { ApiKeyFormServer } from "./api-key-form-server";
import { ApiKeyInfoAlert } from "../docs/api-key-info-alert";

const getId = (text: React.ReactNode) => {
  if (typeof text !== "string") return undefined;
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

export const MDXComponents = {
  h1: ({ children, ...props }) => {
    const id = getId(children);
    return (
      <h1 id={id} className="text-4xl font-bold mb-4" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = getId(children);
    return (
      <h2
        id={id}
        className="scroll-mt-24 text-2xl font-bold mt-12 mb-4"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3: ({ children, ...props }) => {
    const id = getId(children);
    return (
      <h3 id={id} className="text-xl font-semibold mt-8 mb-6" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = getId(children);
    return (
      <h4 id={id} className="text-lg font-semibold mt-4 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }) => (
    <p className="leading-7 text-base text-foreground/90 mb-4" {...props}>
      {children}
    </p>
  ),

  code: ({ children, className = "", ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-1 font-mono text-sm",
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => {
    const child = children?.props;
    const codeString =
      typeof child?.children === "string" ? child.children.trim() : "";
    const language = child?.className?.replace("language-", "") || "bash";

    return <CodeBlock code={codeString} language={language} {...props} />;
  },
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside space-y-1 ml-4 my-2" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => (
    <Link
      href={href}
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      {...props}
    >
      {children}
    </Link>
  ),
  strong: ({ children, ...props }) => <strong {...props}>{children}</strong>,
  CommandsCliTable,
  FAQDocs,
  ApiKeyForm: ApiKeyFormServer,
  ApiKeyInfoAlert,
};
