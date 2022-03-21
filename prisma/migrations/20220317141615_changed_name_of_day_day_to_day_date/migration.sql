/*
  Warnings:

  - You are about to drop the column `day` on the `Day` table. All the data in the column will be lost.
  - Added the required column `date` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "day",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
