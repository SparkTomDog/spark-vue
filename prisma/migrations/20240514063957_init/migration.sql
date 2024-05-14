/*
  Warnings:

  - You are about to drop the column `parentId` on the `DataModel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DataModel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "updateAt" TEXT,
    "createAt" TEXT,
    "deleteAt" TEXT
);
INSERT INTO "new_DataModel" ("content", "id", "label") SELECT "content", "id", "label" FROM "DataModel";
DROP TABLE "DataModel";
ALTER TABLE "new_DataModel" RENAME TO "DataModel";
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
