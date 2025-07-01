/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "apiKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_apiKey_key" ON "user"("apiKey");
