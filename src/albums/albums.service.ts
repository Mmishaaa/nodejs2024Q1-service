import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!album)
      throw new HttpException(
        `album with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });
    return newAlbum;
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    const album = this.getById(id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getById(id);

    const updatedAlbum = await this.prisma.album.update({
      where: {
        id: album.id,
      },
      data: {
        ...updateAlbumDto,
      },
    });
    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.getById(id);

    await this.prisma.album.delete({
      where: {
        id: album.id,
      },
    });
  }
}
