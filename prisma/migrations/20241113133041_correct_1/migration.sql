/*
  Warnings:

  - You are about to drop the column `srtistId` on the `Album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "srtistId",
ADD COLUMN     "artistId" TEXT;
