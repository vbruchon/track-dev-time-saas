/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_categoryId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "_ProjectCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectCategories_B_index" ON "_ProjectCategories"("B");

-- AddForeignKey
ALTER TABLE "_ProjectCategories" ADD CONSTRAINT "_ProjectCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectCategories" ADD CONSTRAINT "_ProjectCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
