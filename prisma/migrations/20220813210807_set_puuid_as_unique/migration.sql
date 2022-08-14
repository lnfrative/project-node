/*
  Warnings:

  - A unique constraint covering the columns `[puuid]` on the table `summoner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "summoner_puuid_key" ON "summoner"("puuid");
