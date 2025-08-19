-- AlterTable
ALTER TABLE "public"."subscription" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
