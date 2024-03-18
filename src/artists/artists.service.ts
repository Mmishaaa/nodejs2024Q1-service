import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const artist = this.databaseService.findArtist(id);

    if (!artist)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = this.databaseService.createArtist(createArtistDto);
    return artist;
  }

  findAll() {
    const artists = this.databaseService.getAllArtists();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.getById(id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getById(id);

    const updatedArtist = this.databaseService.updateArtist(
      id,
      updateArtistDto,
    );
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.getById(id);
    this.databaseService.deleteArtist(id);
  }
}
