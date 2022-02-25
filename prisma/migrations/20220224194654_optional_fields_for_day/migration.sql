/*
  Warnings:

  - You are about to drop the column `authorId` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fullName` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typ` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayId` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diary` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_eventId_fkey";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "typ" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "authorId",
DROP COLUMN "date",
DROP COLUMN "text",
ADD COLUMN     "dayId" TEXT NOT NULL,
ADD COLUMN     "diary" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "place" TEXT,
    "xCoordinate" DOUBLE PRECISION,
    "yCoordinate" DOUBLE PRECISION,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
