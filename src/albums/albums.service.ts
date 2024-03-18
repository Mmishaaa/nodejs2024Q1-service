import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const album = this.databaseService.findAlbum(id);

    if (!album)
      throw new HttpException(
        `album with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.databaseService.createAlbum(createAlbumDto);
    return newAlbum;
  }

  findAll() {
    const albums = this.databaseService.getAllAlbums();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.getById(id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getById(id);

    const updatedAlbum = this.databaseService.updateAlbum(id, updateAlbumDto);
    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.getById(id);

    this.databaseService.deleteAlbum(id);
  }
}
