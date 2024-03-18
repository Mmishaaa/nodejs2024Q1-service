import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';
@Injectable()
export class TracksService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const track = this.databaseService.findTrack(id);

    if (!track)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = this.databaseService.createTrack(createTrackDto);
    return track;
  }

  async findAll() {
    return this.databaseService.getAllTracks();
  }

  async findOne(id: string) {
    const track = this.getById(id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.getById(id);
    const updatedTrack = this.databaseService.updateTrack(id, updateTrackDto);
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.getById(id);

    this.databaseService.deleteTrack(id);
  }
}
