/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Day` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Day_date_key" ON "Day"("date");
