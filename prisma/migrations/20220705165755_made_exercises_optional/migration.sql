-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "exerciseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
