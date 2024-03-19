import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { DatabaseService } from 'src/database/database.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  // constructor(private readonly databaseService: DatabaseService) {}
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const favs = await this.prisma.favorites.findFirst({
      select: {
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    console.log(favs);
    return favs;
  }

  private async getAlbumById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favAlbum = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!favAlbum)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return favAlbum;
  }

  private async getArtistById(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favArtist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!favArtist)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return favArtist;
  }

  private async getTrackById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const favTrack = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!favTrack)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return favTrack;
  }

  async addFavAlbum(id: string) {
    const favs = await this.prisma.favorites.findFirst();
    if (!favs) {
      await this.prisma.favorites.create({ data: {} });
    }
    console.log(favs.favId);
    const favAlbum = await this.getAlbumById(id);
    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        albums: {
          connect: { id },
        },
      },
    });
    return favAlbum;
  }

  async addFavArtist(id: string) {
    const favs = await this.prisma.favorites.findFirst();
    if (!favs) {
      console.log('HERE2');
      await this.prisma.favorites.create({ data: {} });
    }
    const favArtist = await this.getArtistById(id);
    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        artists: {
          connect: { id },
        },
      },
    });
    return favArtist;
  }

  async addFavTrack(id: string) {
    const favs = await this.prisma.favorites.findFirst();
    if (!favs)
      await this.prisma.favorites.create({
        data: {},
      });
    const favTrack = await this.getTrackById(id);
    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        tracks: {
          connect: {
            id,
          },
        },
      },
    });
    //this.databaseService.addFavTrack(favTrack);
    return favTrack;
  }

  async removeFavAlbum(id: string) {
    const favs = await this.prisma.favorites.findFirst();
    const favAlbum = await this.getAlbumById(id);
    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        albums: {
          disconnect: { id },
        },
      },
    });
  }

  async removeFavArtist(id: string) {
    const favs = await this.prisma.favorites.findFirst();
    // console.log('FAVS: ' + favs.favId);

    const favArtist = await this.getArtistById(id);
    // console.log(favArtist);
    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        artists: {
          disconnect: { id },
        },
      },
    });
    // console.log(user);
  }

  async removeFavTrack(id: string) {
    const favs = await this.prisma.favorites.findFirst();
    const favTrack = await this.getTrackById(id);

    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        tracks: {
          disconnect: { id },
        },
      },
    });
  }
}
