-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transcript" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "fellowName" TEXT,
    "score" INTEGER,
    "label" TEXT
);
