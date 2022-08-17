-- CreateTable
CREATE TABLE "record" (
    "id" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "win" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "championName" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recordDetails" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "recordDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "record_matchId_key" ON "record"("matchId");

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "recordDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
