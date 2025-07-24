"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeBlock } from "./code-block";
import Link from "next/link";

const faqItems = [
  {
    question: "What happens if I lose my API key?",
    answer: (
      <>
        You can regenerate a new API key from your{" "}
        <Link
          href="/dashboard/account"
          className="underline underline-offset-2"
        >
          dashboard account settings
        </Link>
        , or directly in this documentation at &quot;Connecting your CLI to the
        Dashboard&quot; .<br />
        Once you have the new key, run:
        <div className="my-2">
          <CodeBlock code="track-dev-time auth --apikey &lt;yourNewApiKey&gt;" />
        </div>
      </>
    ),
  },
  {
    question: "Can I use track-dev-time across multiple projects?",
    answer: (
      <>
        Yes. You can install and initialize track-dev-time in as many projects
        as you want. All sessions will be linked to your account using your
        globally stored API key.
      </>
    ),
  },
  {
    question: "Where is the session data stored locally?",
    answer: (
      <>
        Session data is stored in a hidden <code>.track-dev-time/</code>{" "}
        directory inside each tracked project. This folder is automatically
        added to your <code>.gitignore</code> file during setup to avoid
        polluting your version control.
      </>
    ),
  },
  {
    question: "What if I used the CLI before signing up for the dashboard?",
    answer: (
      <>
        No problem. You can authenticate anytime by running:
        <div className="my-2">
          <CodeBlock code="track-dev-time auth --apikey &lt;yourApiKey&gt;" />
        </div>
        Then, run the following inside each tracked project to sync your local
        sessions to your account:
        <div className="my-2">
          <CodeBlock code="track-dev-time sync" />
        </div>
      </>
    ),
  },
  {
    question: "How do I uninstall or remove tracking from a project?",
    answer: (
      <>
        To completely remove the tracker from a project and restore your
        original configuration, run:
        <div className="my-2">
          <CodeBlock code="track-dev-time uninstall" />
        </div>
        This will clean up your <code>package.json</code> and remove tracking
        hooks.
      </>
    ),
  },
  {
    question: "Can I pause or stop a session manually?",
    answer: (
      <>
        No need! The CLI automatically starts, pauses, and stops sessions based
        on your dev server activity. If needed, you can disable tracking
        temporarily by commenting out or removing the changes from your dev
        script in <code>package.json</code>.
      </>
    ),
  },
  {
    question: "Do I need to install concurrently manually?",
    answer: (
      <>
        No. <code>track-dev-time</code> includes it as a dependency and handles
        everything for you behind the scenes.
      </>
    ),
  },
];

export function FAQDocs() {
  return (
    <Accordion type="multiple" className="w-full ">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="font-semibold ">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
