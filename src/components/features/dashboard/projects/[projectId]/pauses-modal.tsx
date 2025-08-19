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
import { getPausesColumns } from "./pauses-column";

export type PausesModalProps = {
  pauses: Pause[] | undefined;
  dict: {
    label: string;
    title: string;
    noFound: string;
    date: string;
    startedAt: string;
    endedAt: string;
    duration: string;
    next: string;
    previous: string;
  };
};

export const PausesModal = ({ pauses = [], dict }: PausesModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          {pauses.length} {dict.label}(s)
          <button aria-label="View breaks" className="hover:cursor-pointer">
            <Eye size={16} />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[70vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{dict.title}</DialogTitle>
        </DialogHeader>
        {pauses.length === 0 ? (
          <p>{dict.noFound}.</p>
        ) : (
          <DataTable
            columns={getPausesColumns(dict)}
            data={pauses}
            nextText={dict.next}
            previousText={dict.previous}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
