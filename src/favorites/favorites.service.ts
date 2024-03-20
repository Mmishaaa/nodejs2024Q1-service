import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album, Artist, Track } from '@prisma/client';
import { FavEntities } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavs() {
    const favs = await this.prisma.favorites.findFirst();
    if (favs) {
      return favs;
    }
    return await this.prisma.favorites.create({ data: {} });
  }

  async findAll() {
    await this.getFavs();
    return await this.prisma.favorites.findFirst({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        tracks: {
          select: {
            id: true,
            duration: true,
            name: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: { id: true, name: true, artistId: true, year: true },
        },
      },
    });
  }

  private async getEntityById(args: { id: string; model: FavEntities }) {
    const { id, model } = args;

    if (!validate(id))
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    let favModel: Album | Artist | Track;

    switch (model) {
      case FavEntities.ARTIST: {
        favModel = await this.prisma.artist.findUnique({
          where: {
            id: id,
          },
        });
        break;
      }
      case FavEntities.ALBUM: {
        favModel = await this.prisma.album.findUnique({
          where: {
            id: id,
          },
        });
        break;
      }
      case FavEntities.TRACK: {
        favModel = await this.prisma.track.findUnique({
          where: {
            id: id,
          },
        });
        break;
      }
    }

    if (!favModel)
      throw new HttpException(
        `${model} with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return favModel;
  }

  async addFavEntity(args: { id: string; model: FavEntities }) {
    const { id, model } = args;
    const favs = await this.getFavs();
    const favEntity = await this.getEntityById({ id, model });

    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        [model + 's']: {
          connect: { id },
        },
      },
    });

    return favEntity;
  }

  async removeFavEntity(args: { id: string; model: FavEntities }) {
    const { id, model } = args;

    const favs = await this.getFavs();

    await this.getEntityById({ id, model }); // CHECK IF ENTITY EXISTS, IF NOT - THROW ERROR

    await this.prisma.favorites.update({
      where: {
        favId: favs.favId,
      },
      data: {
        [model + 's']: {
          disconnect: { id },
        },
      },
    });
  }
}
