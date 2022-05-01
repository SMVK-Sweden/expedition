-- CreateTable
CREATE TABLE "KsamsokImage" (
    "url" TEXT NOT NULL,
    "description" TEXT,
    "dayId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "KsamsokImage_dayId_key" ON "KsamsokImage"("dayId");

-- AddForeignKey
ALTER TABLE "KsamsokImage" ADD CONSTRAINT "KsamsokImage_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
