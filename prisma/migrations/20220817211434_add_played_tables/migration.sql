-- CreateTable
CREATE TABLE "played" (
    "id" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,

    CONSTRAINT "played_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playedChampion" (
    "id" TEXT NOT NULL,
    "playedId" TEXT NOT NULL,
    "championName" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,

    CONSTRAINT "playedChampion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "played" ADD CONSTRAINT "played_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playedChampion" ADD CONSTRAINT "playedChampion_playedId_fkey" FOREIGN KEY ("playedId") REFERENCES "played"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
