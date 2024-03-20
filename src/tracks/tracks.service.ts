import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TracksService {
  //constructor(private readonly databaseService: DatabaseService) {}
  constructor(private readonly prisma: PrismaService) {}

  private async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        ...createTrackDto,
      },
    });
    return track;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = this.getById(id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.getById(id);
    const updatedTrack = this.prisma.track.update({
      where: {
        id: id,
      },
      data: {
        ...updateTrackDto,
      },
    });
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.getById(id);

    await this.prisma.track.delete({
      where: {
        id: track.id,
      },
    });
  }
}
