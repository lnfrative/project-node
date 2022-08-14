-- CreateTable
CREATE TABLE "doctrine_migration_versions" (
    "version" VARCHAR(191) NOT NULL,
    "executed_at" TIMESTAMP(0),
    "execution_time" INTEGER,

    CONSTRAINT "doctrine_migration_versions_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "summoner" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "summoner_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_icon_id" INTEGER NOT NULL,
    "revision_date" INTEGER NOT NULL,
    "summoner_level" INTEGER NOT NULL,

    CONSTRAINT "summoner_pkey" PRIMARY KEY ("id")
);
