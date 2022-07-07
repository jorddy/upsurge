/*
  Warnings:

  - The `currentWeight` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `targetWeight` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentDistance` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `targetDistance` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `reps` column on the `Set` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weight` column on the `Set` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `distance` column on the `Set` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `elevation` column on the `Set` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "currentWeight";
ALTER TABLE "Exercise" ADD COLUMN     "currentWeight" FLOAT8;
ALTER TABLE "Exercise" DROP COLUMN "targetWeight";
ALTER TABLE "Exercise" ADD COLUMN     "targetWeight" FLOAT8;
ALTER TABLE "Exercise" DROP COLUMN "currentDistance";
ALTER TABLE "Exercise" ADD COLUMN     "currentDistance" FLOAT8;
ALTER TABLE "Exercise" DROP COLUMN "targetDistance";
ALTER TABLE "Exercise" ADD COLUMN     "targetDistance" FLOAT8;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "reps";
ALTER TABLE "Set" ADD COLUMN     "reps" FLOAT8;
ALTER TABLE "Set" DROP COLUMN "weight";
ALTER TABLE "Set" ADD COLUMN     "weight" FLOAT8;
ALTER TABLE "Set" DROP COLUMN "distance";
ALTER TABLE "Set" ADD COLUMN     "distance" FLOAT8;
ALTER TABLE "Set" DROP COLUMN "elevation";
ALTER TABLE "Set" ADD COLUMN     "elevation" FLOAT8;
