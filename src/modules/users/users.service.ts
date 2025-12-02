import { AppException, ErrorCodes } from '@/common';
import { User } from '@/modules/users/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos';
import { mapperUser } from './mappers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new AppException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getMe(userId: number): Promise<UserDto> {
    const user = await this.findOne(userId);
    return mapperUser.toDto(user);
  }

  async logout(userId: number) {
    await this.usersRepository.update(userId, { refreshToken: null });
  }
}
