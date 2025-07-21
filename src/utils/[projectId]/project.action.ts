"use server";

import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

const getProject = async (projectId: string) => {
  const user = await getRequiredUser();

  const project = await prisma.project.findUnique({
    where: { id: projectId, userId: user.id },
  });
  return project;
};

export const deleteProject = async (projectId: string) => {
  const project = getProject(projectId);

  if (!project) {
    throw new Error("Not authorized to delete this project");
  }

  await prisma.project.delete({
    where: { id: projectId },
  });
};

export const deleteDevSessions = async (projectId: string) => {
  const project = await getProject(projectId);

  if (!project) {
    throw new Error("Not authorized to delete this project");
  }

  await prisma.project.delete({
    where: { id: projectId },
  });
};

export const deletePauses = async (projectId: string) => {
  const user = await getRequiredUser();

  const project = await prisma.project.findUnique({
    where: { id: projectId, userId: user.id },
  });

  if (!project) {
    throw new Error("Not authorized to delete this project");
  }

  await prisma.project.delete({
    where: { id: projectId },
  });
};
