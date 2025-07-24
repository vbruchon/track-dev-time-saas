"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "../button/copy-button";

const cliCommands = [
  {
    command: "track-dev-time setup",
    description: "Configure the project to start tracking automatically",
  },
  {
    command: "track-dev-time auth",
    description: "Link CLI to your SaaS account via API key",
  },
  {
    command: "track-dev-time sync",
    description: "Manually sync local sessions to the SaaS dashboard",
  },
  {
    command: "track-dev-time uninstall",
    description: "Remove tracking setup from the project",
  },
];

export function CommandsCliTable() {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Command</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cliCommands.map((item) => (
          <TableRow key={item.command} className="group">
            <TableCell className="relative">
              <code>{item.command}</code>
              <CopyButton
                value={item.command}
                className="absolute top-1/2 -translate-y-1/2 right-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </TableCell>
            <TableCell>{item.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
