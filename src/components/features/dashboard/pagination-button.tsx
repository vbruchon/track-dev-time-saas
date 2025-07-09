import { Button } from "@/components/ui/button";
import { Table as ReactTable } from "@tanstack/react-table";
import React from "react";

interface PaginationButtonProps<TData> {
  table: ReactTable<TData>;
}

export function PaginationButton<TData>({
  table,
}: PaginationButtonProps<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
}
