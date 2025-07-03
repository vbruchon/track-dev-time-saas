import { Badge } from "@/components/ui/badge";
import { DevSession, Project } from "@/generated";
import { FolderCode, Code2, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

type ProjectWithSessions = Project & {
  devSessions: DevSession[];
};

interface ProjectCardProps {
  project: ProjectWithSessions;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const totalDuration = project.devSessions.reduce(
    (acc, session) => acc + (session.duration ?? 0),
    0
  );

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}min`;
  };

  return (
    <Link
      key={project.id}
      href={`/dashboard/projects/${project.id}`}
      className="group flex flex-col gap-4 border-l-4 border-green-700 bg-card rounded-md shadow-sm px-6 pt-6 pb-2 hover:shadow-lg hover:border-primary transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <FolderCode className="size-6" />
        {project.name}
      </div>
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="py-1 px-2">
          <Code2 className="!size-4" />
          {project.devSessions.length} session
          {project.devSessions.length > 1 ? "s" : ""}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
          <Clock className="!size-4" />
          {formatDuration(totalDuration)}
        </Badge>
      </div>
      <p className="text-xs text-right mb-auto">
        Created at:{" "}
        <span className="">{project.createdAt.toLocaleDateString()}</span>
      </p>
    </Link>
  );
};
