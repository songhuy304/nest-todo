import { User } from '@/entities';
import { UserDto } from '../dtos';

export const mapperUser = {
  toDto: (user: User): UserDto => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      role: user.role.name,
    };
  },
};
