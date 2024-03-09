import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.databaseService.createAlbum(createAlbumDto);
    return newAlbum;
  }

  findAll() {
    const albums = this.databaseService.getAllAlbums();
    return albums;
  }

  findOne(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = this.databaseService.findAlbum(id);
    if (!album)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = this.databaseService.findAlbum(id);
    if (!album)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    const updatedAlbum = this.databaseService.updateAlbum(id, updateAlbumDto);
    return updatedAlbum;
  }

  remove(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    const album = this.databaseService.findAlbum(id);
    if (!album)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    this.databaseService.deleteAlbum(id);
  }
}
