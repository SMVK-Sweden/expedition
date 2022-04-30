/*
  Warnings:

  - The required column `id` was added to the `KsamsokImage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "KsamsokImage_dayId_key";

-- AlterTable
ALTER TABLE "KsamsokImage" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "KsamsokImage_pkey" PRIMARY KEY ("id");
