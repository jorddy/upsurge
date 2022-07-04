/*
  Warnings:

  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `isCurrent` on the `Set` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- DropIndex
DROP INDEX "Entry_exerciseId_idx";

-- DropIndex
DROP INDEX "Exercise_userId_workoutId_idx";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "workoutId" STRING;

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "description";
ALTER TABLE "Exercise" DROP COLUMN "workoutId";
ALTER TABLE "Exercise" ADD COLUMN     "currentDistance" INT4;
ALTER TABLE "Exercise" ADD COLUMN     "targetDistance" INT4;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "intensity";
ALTER TABLE "Set" DROP COLUMN "isCurrent";
ALTER TABLE "Set" ADD COLUMN     "elevation" INT4;
ALTER TABLE "Set" ALTER COLUMN "reps" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Entry_exerciseId_workoutId_idx" ON "Entry"("exerciseId", "workoutId");

-- CreateIndex
CREATE INDEX "Exercise_userId_idx" ON "Exercise"("userId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
