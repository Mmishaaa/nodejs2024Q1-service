-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favAlbumId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favArtistId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favTrackId_fkey";

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favArtistId_fkey" FOREIGN KEY ("favArtistId") REFERENCES "Favorites"("favId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favAlbumId_fkey" FOREIGN KEY ("favAlbumId") REFERENCES "Favorites"("favId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favTrackId_fkey" FOREIGN KEY ("favTrackId") REFERENCES "Favorites"("favId") ON DELETE CASCADE ON UPDATE CASCADE;
