import { ProjectCard } from "@/components/features/dashboard/projects/project-card";
import { getRequiredUser } from "@/lib/auth-session";
import { getAllProjects } from "@/lib/queries/dashboard/projects/get-all-projects";
import Link from "next/link";

export default async function ProjectsPage() {
  const user = await getRequiredUser();

  const projects = await getAllProjects(user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <div>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">
            You haven’t tracked any project yet.{" "}
            <Link href="/dashboard/doc" className="underline">
              Learn how to start tracking.
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-5 gap-x-4 gap-y-8">
            {projects.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
