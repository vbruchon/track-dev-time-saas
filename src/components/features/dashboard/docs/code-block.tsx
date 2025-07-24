import { CopyButton } from "../button/copy-button";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export const CodeBlock = ({ code, language = "bash" }: CodeBlockProps) => {
  return (
    <div className="relative bg-card rounded-lg overflow-hidden my-6">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border text-sm text-muted-foreground">
        <span className="capitalize">{language}</span>
        <CopyButton value={code} />
      </div>
      <pre className="px-4 py-3 overflow-x-auto text-sm text-muted-foreground">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
