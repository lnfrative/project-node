/*
  Warnings:

  - You are about to drop the column `account_id` on the `summoner` table. All the data in the column will be lost.
  - You are about to drop the column `profile_icon_id` on the `summoner` table. All the data in the column will be lost.
  - You are about to drop the column `revision_date` on the `summoner` table. All the data in the column will be lost.
  - You are about to drop the column `summoner_id` on the `summoner` table. All the data in the column will be lost.
  - You are about to drop the column `summoner_level` on the `summoner` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileIconId` to the `summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revisionDate` to the `summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riotId` to the `summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerId` to the `summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerLevel` to the `summoner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summoner" DROP COLUMN "account_id",
DROP COLUMN "profile_icon_id",
DROP COLUMN "revision_date",
DROP COLUMN "summoner_id",
DROP COLUMN "summoner_level",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "profileIconId" INTEGER NOT NULL,
ADD COLUMN     "revisionDate" INTEGER NOT NULL,
ADD COLUMN     "riotId" TEXT NOT NULL,
ADD COLUMN     "summonerId" TEXT NOT NULL,
ADD COLUMN     "summonerLevel" INTEGER NOT NULL;
