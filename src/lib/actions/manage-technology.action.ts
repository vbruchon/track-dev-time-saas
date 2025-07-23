"use server";

import { getUserId } from "../auth-session";
import { prisma } from "../prisma";

function normalizeTechnologyName(name: string) {
  return name.trim().toLowerCase();
}

export const updateProjectTechnology = async ({
  projectId,
  technologyNames,
  newTechnology,
}: {
  projectId: string;
  technologyNames: string[];
  newTechnology?: string;
}) => {
  const userId = await getUserId();

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) throw new Error("No project found or user unauthorized");

  const normalizedFromCheckboxes = technologyNames
    .map(normalizeTechnologyName)
    .filter(Boolean);

  if (newTechnology?.trim()) {
    const rawUserInput = newTechnology.trim();
    const normalized = normalizeTechnologyName(rawUserInput);

    let existingTech = await prisma.technology.findFirst({
      where: { name: { equals: normalized, mode: "insensitive" } },
    });

    if (!existingTech) {
      existingTech = await prisma.technology.create({
        data: { name: rawUserInput },
      });
    }

    normalizedFromCheckboxes.push(normalizeTechnologyName(existingTech.name));
  }

  const uniqueNormalized = Array.from(new Set(normalizedFromCheckboxes));

  const matchedTechnologies = await prisma.technology.findMany({
    where: { name: { in: uniqueNormalized, mode: "insensitive" } },
  });

  return await prisma.project.update({
    where: { id: projectId },
    data: {
      technologies: {
        set: matchedTechnologies.map((tech) => ({ id: tech.id })),
      },
    },
  });
};
