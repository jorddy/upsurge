-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
