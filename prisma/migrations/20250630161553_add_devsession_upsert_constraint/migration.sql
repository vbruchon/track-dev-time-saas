/*
  Warnings:

  - A unique constraint covering the columns `[projectId,startedAt]` on the table `DevSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DevSession_projectId_startedAt_key" ON "DevSession"("projectId", "startedAt");
