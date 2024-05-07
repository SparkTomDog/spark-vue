-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "type" TEXT NOT NULL DEFAULT 'folder',
    "parentId" TEXT,
    CONSTRAINT "DataModel_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DataModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DataModel" ("content", "id", "label", "parentId", "type") SELECT "content", "id", "label", "parentId", "type" FROM "DataModel";
DROP TABLE "DataModel";
ALTER TABLE "new_DataModel" RENAME TO "DataModel";
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
