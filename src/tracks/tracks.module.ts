import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
})
export class TracksModule {}
