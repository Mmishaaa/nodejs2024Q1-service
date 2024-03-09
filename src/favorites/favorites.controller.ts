import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('artist/:id')
  addFavArtist(@Param('id') id: string) {
    return this.favoritesService.addFavArtist(id);
  }
  @Post('track/:id')
  addFavTrack(@Param('id') id: string) {
    return this.favoritesService.addFavTrack(id);
  }

  @Post('album/:id')
  addFavAlbum(@Param('id') id: string) {
    return this.favoritesService.addFavAlbum(id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeFavTrack(@Param('id') id: string) {
    this.favoritesService.removeFavTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeFavAlbum(@Param('id') id: string) {
    this.favoritesService.removeFavAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeFavArtist(@Param('id') id: string) {
    this.favoritesService.removeFavArtist(id);
  }
}
