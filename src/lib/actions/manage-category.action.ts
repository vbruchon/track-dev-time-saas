"use server";

import { Categories } from "@/generated";
import { prisma } from "../prisma";

export const updateProjectCategory = async (
  projectId: string,
  newCategoryNames: Categories[]
) => {
  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: newCategoryNames,
      },
    },
    select: {
      id: true,
    },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      categories: {
        set: categories.map((c) => ({ id: c.id })),
      },
    },
  });
};
