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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('artist/:id')
  async addFavArtist(@Param('id') id: string) {
    return await this.favoritesService.addFavArtist(id);
  }

  @Post('track/:id')
  async addFavTrack(@Param('id') id: string) {
    return await this.favoritesService.addFavTrack(id);
  }

  @Post('album/:id')
  async addFavAlbum(@Param('id') id: string) {
    return await this.favoritesService.addFavAlbum(id);
  }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeFavTrack(@Param('id') id: string) {
    await this.favoritesService.removeFavTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeFavAlbum(@Param('id') id: string) {
    await this.favoritesService.removeFavAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeFavArtist(@Param('id') id: string) {
    await this.favoritesService.removeFavArtist(id);
  }
}
