/*
  Warnings:

  - You are about to drop the `_EntryToWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EntryToWorkout" DROP CONSTRAINT "_EntryToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntryToWorkout" DROP CONSTRAINT "_EntryToWorkout_B_fkey";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "workoutId" STRING;

-- DropTable
DROP TABLE "_EntryToWorkout";

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
