/*
  Warnings:

  - You are about to drop the column `xCoordinate` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `yCoordinate` on the `Day` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "xCoordinate",
DROP COLUMN "yCoordinate",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
