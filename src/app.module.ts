import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule, ArtistsModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
