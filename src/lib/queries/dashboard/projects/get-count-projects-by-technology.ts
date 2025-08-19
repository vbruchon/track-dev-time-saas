import { prisma } from "@/lib/prisma";

export async function getProjectsCountByTechnology(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    include: { technologies: true },
  });

  const counts: Record<string, number> = {};

  for (const project of projects) {
    for (const tech of project.technologies) {
      counts[tech.name] = (counts[tech.name] ?? 0) + 1;
    }
  }

  return counts; // ex: { "Next.js": 8, "Node.js": 3, "Nuxt": 1 }
}
