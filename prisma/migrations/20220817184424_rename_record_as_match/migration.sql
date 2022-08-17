/*
  Warnings:

  - You are about to drop the column `summonerId` on the `summoner` table. All the data in the column will be lost.
  - You are about to drop the `record` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recordDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `playerId` to the `summoner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "record" DROP CONSTRAINT "record_matchId_fkey";

-- DropForeignKey
ALTER TABLE "record" DROP CONSTRAINT "record_summonerId_fkey";

-- AlterTable
ALTER TABLE "summoner" DROP COLUMN "summonerId",
ADD COLUMN     "playerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "record";

-- DropTable
DROP TABLE "recordDetails";

-- CreateTable
CREATE TABLE "matchParticipant" (
    "id" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "win" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "championName" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "matchParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "matchParticipant_matchId_key" ON "matchParticipant"("matchId");

-- AddForeignKey
ALTER TABLE "matchParticipant" ADD CONSTRAINT "matchParticipant_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matchParticipant" ADD CONSTRAINT "matchParticipant_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
