import { AppException, ErrorCodes } from '@/common';
import { User } from '@/entities';
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

  async getMe(userId: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new AppException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return mapperUser.toDto(user);
  }
}
