-- AlterTable
ALTER TABLE "Article" ADD COLUMN "subtitle" TEXT;
ALTER TABLE "Article" ADD COLUMN "important" BOOLEAN NOT NULL DEFAULT false;
