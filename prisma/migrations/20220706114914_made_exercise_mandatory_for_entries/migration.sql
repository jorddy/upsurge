/*
  Warnings:

  - You are about to drop the `_EntryToExercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exerciseId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EntryToExercise" DROP CONSTRAINT "_EntryToExercise_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntryToExercise" DROP CONSTRAINT "_EntryToExercise_B_fkey";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "exerciseId" STRING NOT NULL;

-- DropTable
DROP TABLE "_EntryToExercise";

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
