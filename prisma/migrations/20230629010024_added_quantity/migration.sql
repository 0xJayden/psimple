/*
  Warnings:

  - Added the required column `quantity` to the `SpecialItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SpecialItem" (
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "SpecialItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SpecialItemOrder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SpecialItem" ("name", "orderId", "price") SELECT "name", "orderId", "price" FROM "SpecialItem";
DROP TABLE "SpecialItem";
ALTER TABLE "new_SpecialItem" RENAME TO "SpecialItem";
CREATE UNIQUE INDEX "SpecialItem_name_key" ON "SpecialItem"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
