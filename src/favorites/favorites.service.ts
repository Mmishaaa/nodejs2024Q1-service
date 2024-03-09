import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    const favs = this.databaseService.getAllFavs();
    return favs;
  }

  addFavAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favAlbum = this.databaseService.findAlbum(id);
    if (!favAlbum)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.addFavAlbum(favAlbum);
    return favAlbum;
  }

  addFavArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favArtist = this.databaseService.findArtist(id);
    if (!favArtist)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.addFavArtist(favArtist);
    return favArtist;
  }

  addFavTrack(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const favTrack = this.databaseService.findTrack(id);
    if (!favTrack)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    this.databaseService.addFavTrack(favTrack);
    return favTrack;
  }

  removeFavAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favAlbum = this.databaseService.findAlbum(id);
    if (!favAlbum)
      throw new HttpException(
        `album with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    this.databaseService.deleteFavAlbum(favAlbum);
    // return favAlbum;
  }

  removeFavArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favArtist = this.databaseService.findArtist(id);
    if (!favArtist) {
      throw new HttpException(
        `artist with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.databaseService.deleteFavArtist(favArtist);
  }

  removeFavTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favTrack = this.databaseService.findTrack(id);
    if (!favTrack) {
      throw new HttpException(
        `track with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.databaseService.deleteFavTrack(favTrack);
  }
}
