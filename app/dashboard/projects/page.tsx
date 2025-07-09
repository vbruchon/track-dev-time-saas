import { ProjectCard } from "@/components/features/dashboard/projects/project-card";
import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const user = await getRequiredUser();

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: { devSessions: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <div className="grid grid-cols-5 gap-x-4 gap-y-8">
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
