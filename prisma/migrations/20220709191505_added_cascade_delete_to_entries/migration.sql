-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_entryId_fkey";

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
