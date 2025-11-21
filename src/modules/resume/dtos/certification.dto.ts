import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CertificationResumeDto {
  @Expose()
  @IsString()
  certificationName: string;

  @IsOptional()
  @Expose()
  @IsString()
  certificationLink?: string;

  @IsOptional()
  @Expose()
  @IsString()
  issuedDate?: string;
}
