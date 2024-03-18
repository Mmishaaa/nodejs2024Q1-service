import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async getById(id: string) {
    if (!validate(id))
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );

    const user = this.databaseService.findUser(id);

    if (!user)
      throw new HttpException(
        `user with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  private async getUserWithoutPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers() {
    const users = this.databaseService.getAllUsers();
    return users;
  }

  async getUserById(id: string) {
    const user = this.getById(id);
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = this.databaseService.createUser(dto);
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getById(id);

    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);

    const updatedUser = await this.databaseService.updatePassword(
      id,
      updatePasswordDto,
    );

    updatedUser.updatedAt = Date.now();
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.getById(id);

    this.databaseService.deleteUser(id);
  }
}
