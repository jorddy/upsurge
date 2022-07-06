/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_workoutId_fkey";

-- DropIndex
DROP INDEX "Entry_exerciseId_workoutId_idx";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "exerciseId";
ALTER TABLE "Entry" DROP COLUMN "workoutId";

-- CreateTable
CREATE TABLE "_EntryToExercise" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_EntryToWorkout" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToExercise_AB_unique" ON "_EntryToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToExercise_B_index" ON "_EntryToExercise"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToWorkout_AB_unique" ON "_EntryToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToWorkout_B_index" ON "_EntryToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_EntryToExercise" ADD CONSTRAINT "_EntryToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToExercise" ADD CONSTRAINT "_EntryToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToWorkout" ADD CONSTRAINT "_EntryToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToWorkout" ADD CONSTRAINT "_EntryToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
