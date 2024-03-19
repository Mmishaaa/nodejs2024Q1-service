import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    const favs = this.databaseService.getAllFavs();
    return favs;
  }

  private async getAlbumById(id: string) {
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
    return favAlbum;
  }

  private async getArtistById(id: string) {
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
    return favArtist;
  }

  private async getTrackById(id: string) {
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
    return favTrack;
  }

  async addFavAlbum(id: string) {
    const favAlbum = await this.getAlbumById(id);
    this.databaseService.addFavAlbum(favAlbum);
    return favAlbum;
  }

  async addFavArtist(id: string) {
    const favArtist = await this.getArtistById(id);
    this.databaseService.addFavArtist(favArtist);
    return favArtist;
  }

  async addFavTrack(id: string) {
    const favTrack = await this.getTrackById(id);
    this.databaseService.addFavTrack(favTrack);
    return favTrack;
  }

  async removeFavAlbum(id: string) {
    const favAlbum = await this.getAlbumById(id);
    this.databaseService.deleteFavAlbum(favAlbum);
  }

  async removeFavArtist(id: string) {
    const favArtist = await this.getArtistById(id);
    this.databaseService.deleteFavArtist(favArtist);
  }

  async removeFavTrack(id: string) {
    const favTrack = await this.getTrackById(id);
    this.databaseService.deleteFavTrack(favTrack);
  }
}
