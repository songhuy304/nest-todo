import { User } from '@/modules/users/entities';
import { UserDto } from '../dtos';
import { plainToInstance } from 'class-transformer';

export const mapperUser = {
  toDto: (user: User): UserDto =>
    plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
};
