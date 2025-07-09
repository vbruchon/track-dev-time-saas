-- DropForeignKey
ALTER TABLE "DevSession" DROP CONSTRAINT "DevSession_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Pause" DROP CONSTRAINT "Pause_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "DevSession" ADD CONSTRAINT "DevSession_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pause" ADD CONSTRAINT "Pause_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "DevSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
