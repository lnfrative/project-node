/*
  Warnings:

  - The primary key for the `summoner` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "summoner" DROP CONSTRAINT "summoner_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "summoner_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "summoner_id_seq";
