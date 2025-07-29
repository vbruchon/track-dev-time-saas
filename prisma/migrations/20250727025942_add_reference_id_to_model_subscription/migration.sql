/*
  Warnings:

  - The values [FREE] on the enum `SubscriptionPlan` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[referenceId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionPlan_new" AS ENUM ('PRO_MONTHLY', 'PRO_YEARLY');
ALTER TABLE "Subscription" ALTER COLUMN "plan" TYPE "SubscriptionPlan_new" USING ("plan"::text::"SubscriptionPlan_new");
ALTER TYPE "SubscriptionPlan" RENAME TO "SubscriptionPlan_old";
ALTER TYPE "SubscriptionPlan_new" RENAME TO "SubscriptionPlan";
DROP TYPE "SubscriptionPlan_old";
COMMIT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "referenceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_referenceId_key" ON "Subscription"("referenceId");
