import { Calendar, Code2 } from "lucide-react";
import { DevSession } from "@/generated";
import { DeleteButtonWithConfirmation } from "../../delete-button-with-confirmation";

type ProjectHeaderProps = {
  projectName: string;
  projectId: string;
  createdAt: Date;
  lastSession: DevSession | null;
};

export const ProjectHeader = ({
  projectName,
  projectId,
  createdAt,
  lastSession,
}: ProjectHeaderProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">{projectName}</h1>
        <DeleteButtonWithConfirmation
          name={projectName}
          projectId={projectId}
        />
      </div>

      <div className="flex items-center gap-6 p-2">
        <p className="text-sm inline-flex items-center gap-2">
          <Calendar className="size-5" /> Created at{" "}
          {createdAt.toLocaleDateString()}
        </p>
        {lastSession && (
          <p className="text-sm inline-flex items-center gap-2">
            <Code2 className="size-5" />
            Last session at {lastSession.startedAt.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};
