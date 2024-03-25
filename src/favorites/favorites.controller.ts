import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavEntities } from 'src/constants/constants';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('artist/:id')
  async addFavArtist(@Param('id') id: string) {
    return await this.favoritesService.addFavEntity({
      id,
      model: FavEntities.ARTIST,
    });
  }

  @Post('track/:id')
  async addFavTrack(@Param('id') id: string) {
    return await this.favoritesService.addFavEntity({
      id,
      model: FavEntities.TRACK,
    });
  }

  @Post('album/:id')
  async addFavAlbum(@Param('id') id: string) {
    return await this.favoritesService.addFavEntity({
      id,
      model: FavEntities.ALBUM,
    });
  }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeFavTrack(@Param('id') id: string) {
    await this.favoritesService.removeFavEntity({
      id,
      model: FavEntities.TRACK,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeFavAlbum(@Param('id') id: string) {
    await this.favoritesService.removeFavEntity({
      id,
      model: FavEntities.ALBUM,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeFavArtist(@Param('id') id: string) {
    await this.favoritesService.removeFavEntity({
      id,
      model: FavEntities.ARTIST,
    });
  }
}
