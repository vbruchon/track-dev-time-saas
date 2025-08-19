"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeBlock } from "./code-block";
import Link from "next/link";

const faqItemsEn = [
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

const faqItemsFr = [
  {
    question: "Que se passe-t-il si je perds ma clé API ?",
    answer: (
      <>
        Vous pouvez régénérer une nouvelle clé API depuis vos{" "}
        <Link
          href="/dashboard/account"
          className="underline underline-offset-2"
        >
          paramètres de compte du dashboard
        </Link>
        , ou directement dans cette documentation à « Connecter votre CLI au
        Dashboard ».
        <br />
        Une fois que vous avez la nouvelle clé, exécutez :
        <div className="my-2">
          <CodeBlock code="track-dev-time auth --apikey &lt;votreNouvelleApiKey&gt;" />
        </div>
      </>
    ),
  },
  {
    question: "Puis-je utiliser track-dev-time sur plusieurs projets ?",
    answer: (
      <>
        Oui. Vous pouvez installer et initialiser track-dev-time sur autant de
        projets que vous voulez. Toutes les sessions seront liées à votre compte
        grâce à votre clé API stockée globalement.
      </>
    ),
  },
  {
    question: "Où sont stockées les données de session localement ?",
    answer: (
      <>
        Les données de session sont stockées dans un dossier caché{" "}
        <code>.track-dev-time/</code> à l’intérieur de chaque projet suivi. Ce
        dossier est automatiquement ajouté à votre fichier{" "}
        <code>.gitignore</code> lors de l’installation pour éviter de polluer
        votre contrôle de version.
      </>
    ),
  },
  {
    question:
      "Que se passe-t-il si j'ai utilisé la CLI avant de m’inscrire au dashboard ?",
    answer: (
      <>
        Aucun problème. Vous pouvez vous authentifier à tout moment en exécutant
        :
        <div className="my-2">
          <CodeBlock code="track-dev-time auth --apikey &lt;votreApiKey&gt;" />
        </div>
        Puis, exécutez la commande suivante dans chaque projet suivi pour
        synchroniser vos sessions locales avec votre compte :
        <div className="my-2">
          <CodeBlock code="track-dev-time sync" />
        </div>
      </>
    ),
  },
  {
    question: "Comment désinstaller ou supprimer le suivi d’un projet ?",
    answer: (
      <>
        Pour supprimer complètement le tracker d’un projet et restaurer votre
        configuration initiale, exécutez :
        <div className="my-2">
          <CodeBlock code="track-dev-time uninstall" />
        </div>
        Cela nettoiera votre <code>package.json</code> et supprimera les hooks
        de suivi.
      </>
    ),
  },
  {
    question: "Puis-je mettre une session en pause ou l’arrêter manuellement ?",
    answer: (
      <>
        Inutile ! La CLI démarre, met en pause et arrête automatiquement les
        sessions en fonction de l’activité de votre serveur de développement. Si
        nécessaire, vous pouvez désactiver temporairement le suivi en commentant
        ou en supprimant les modifications dans le script dev de votre{" "}
        <code>package.json</code>.
      </>
    ),
  },
  {
    question: "Dois-je installer concurrently manuellement ?",
    answer: (
      <>
        Non. <code>track-dev-time</code> l’inclut comme dépendance et gère tout
        automatiquement en arrière-plan.
      </>
    ),
  },
];

export const FAQDocs = ({ lang }: { lang: string }) => {
  const faqItems = lang === "fr" ? faqItemsFr : faqItemsEn;
  return (
    <Accordion type="multiple" className="w-full ">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="font-semibold">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
