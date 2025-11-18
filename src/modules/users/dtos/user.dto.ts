import { Expose, Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ERole } from '@/common/enums';

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

  @Expose()
  @IsOptional()
  @Transform(({ obj }) => obj.resume?.url ?? null, { toPlainOnly: true })
  resumePath?: string;
}
