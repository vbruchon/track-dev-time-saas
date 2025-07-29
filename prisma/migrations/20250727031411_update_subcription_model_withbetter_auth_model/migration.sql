/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subscription` table. All the data in the column will be lost.
  - Changed the type of `plan` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `referenceId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropIndex
DROP INDEX "Subscription_referenceId_key";

-- DropIndex
DROP INDEX "Subscription_userId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "createdAt",
DROP COLUMN "stripeId",
DROP COLUMN "stripePriceId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "cancelAtPeriodEnd" BOOLEAN,
ADD COLUMN     "periodEnd" TIMESTAMP(3),
ADD COLUMN     "periodStart" TIMESTAMP(3),
ADD COLUMN     "seats" INTEGER,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "trialEnd" TIMESTAMP(3),
ADD COLUMN     "trialStart" TIMESTAMP(3),
DROP COLUMN "plan",
ADD COLUMN     "plan" TEXT NOT NULL,
ALTER COLUMN "referenceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "subscriptionId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
