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

type Command = {
  command: string;
  description: string;
};

export const CommandsCliTable = ({ commands }: { commands: Command[] }) => {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Command</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commands.map((item) => (
          <TableRow key={item.command} className="group">
            <TableCell className="relative">
              <code>{item.command}</code>
              <CopyButton
                value={item.command}
                className="absolute top-1/2 -translate-y-1/2 right-1/3 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </TableCell>
            <TableCell>{item.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
