import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ExperienceResumeDto {
  @Expose()
  @IsString()
  nameCompany: string;

  @IsOptional()
  @Expose()
  @IsString()
  description?: string;

  @IsOptional()
  @Expose()
  @IsString()
  startDate?: string;

  @Expose()
  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @Expose()
  @IsString()
  location?: string;

  @IsOptional()
  @Expose()
  @IsBoolean()
  jobRole?: boolean;
}
