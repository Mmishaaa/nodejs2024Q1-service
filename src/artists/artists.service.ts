import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        ...createArtistDto,
      },
    });
    return artist;
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.getById(id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getById(id);

    const updatedArtist = await this.prisma.artist.update({
      where: {
        id: artist.id,
      },
      data: {
        ...updateArtistDto,
      },
    });
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.getById(id);
    await this.prisma.artist.delete({
      where: {
        id: artist.id,
      },
    });
  }
}
