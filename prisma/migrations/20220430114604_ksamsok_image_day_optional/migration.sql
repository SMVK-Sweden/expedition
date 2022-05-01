-- DropForeignKey
ALTER TABLE "KsamsokImage" DROP CONSTRAINT "KsamsokImage_dayId_fkey";

-- AlterTable
ALTER TABLE "KsamsokImage" ALTER COLUMN "dayId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "KsamsokImage" ADD CONSTRAINT "KsamsokImage_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
