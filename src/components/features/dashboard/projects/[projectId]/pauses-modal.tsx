import { Pause } from "@/generated";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { DataTable } from "@/components/features/dashboard/data-table";
import { pausesColumns } from "./pauses-column";

type PausesModalProps = {
  pauses: Pause[] | undefined;
};

export const PausesModal = ({ pauses = [] }: PausesModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          {pauses.length} break(s)
          <button aria-label="View breaks" className="hover:cursor-pointer">
            <Eye size={16} />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[70vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Pauses List</DialogTitle>
        </DialogHeader>
        {pauses.length === 0 ? (
          <p>No pause found.</p>
        ) : (
          <DataTable columns={pausesColumns} data={pauses} />
        )}
      </DialogContent>
    </Dialog>
  );
};
