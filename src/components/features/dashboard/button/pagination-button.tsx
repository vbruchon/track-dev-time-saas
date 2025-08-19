import { Button } from "@/components/ui/button";
import { Table as ReactTable } from "@tanstack/react-table";
import React from "react";

interface PaginationButtonProps<TData> {
  table: ReactTable<TData>;
  nextText?: string;
  previousText?: string;
}

export function PaginationButton<TData>({
  table,
  nextText,
  previousText,
}: PaginationButtonProps<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {previousText ?? "Previous"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {nextText ?? "Next"}
      </Button>
    </div>
  );
}
