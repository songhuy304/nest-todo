import { ERole } from '@/common/enums';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @IsEnum(ERole)
  role: ERole;
}
