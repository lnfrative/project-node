/*
  Warnings:

  - You are about to drop the column `revisionDate` on the `summoner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "summoner" DROP COLUMN "revisionDate",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
