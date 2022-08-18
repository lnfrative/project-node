/*
  Warnings:

  - Added the required column `score` to the `playedChampion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "playedChampion" ADD COLUMN     "score" INTEGER NOT NULL;
