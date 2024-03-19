import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
