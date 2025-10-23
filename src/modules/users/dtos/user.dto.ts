import { ERole } from '@/common/enums';
import { IsEnum } from 'class-validator';

export class UserDto {
  id: number;
  username: string;
  email: string;
  isActive: boolean;

  @IsEnum(ERole)
  role: ERole;
}
