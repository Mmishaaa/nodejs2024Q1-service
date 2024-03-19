import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return this.transformUser(user);
  }

  private async getUserWithoutPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return this.transformUser(userWithoutPassword);
  }

  private async transformUser(user) {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.transformUser(user));
  }

  async getUserById(id: string) {
    const user = await this.getById(id);
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
    return this.getUserWithoutPassword(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getById(id);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        version: { increment: 1 },
        password: updatePasswordDto.newPassword,
      },
    });

    return this.getUserWithoutPassword(updatedUser);
  }

  async deleteUser(id: string) {
    const user = await this.getById(id);

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
