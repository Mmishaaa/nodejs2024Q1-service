/*
  Warnings:

  - You are about to drop the column `albums` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `Favorites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[favAlbumId]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[favArtistId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[favTrackId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favAlbumId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favArtistId" TEXT;

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favTrackId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Album_favAlbumId_key" ON "Album"("favAlbumId");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_favArtistId_key" ON "Artist"("favArtistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_favTrackId_key" ON "Track"("favTrackId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favArtistId_fkey" FOREIGN KEY ("favArtistId") REFERENCES "Favorites"("favId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favAlbumId_fkey" FOREIGN KEY ("favAlbumId") REFERENCES "Favorites"("favId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favTrackId_fkey" FOREIGN KEY ("favTrackId") REFERENCES "Favorites"("favId") ON DELETE SET NULL ON UPDATE CASCADE;
