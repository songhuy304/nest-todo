import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class EducationResumeDto {
  @Expose()
  @IsString()
  educationName: string;

  @Expose()
  @IsString()
  degree: string;

  @IsOptional()
  @Expose()
  @IsString()
  gpa?: string;

  @Expose()
  @IsString()
  startDate: string;

  @IsOptional()
  @Expose()
  @IsString()
  graduationDate?: string;
}
