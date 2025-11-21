import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ProjectResumeDto {
  @Expose()
  @IsString()
  nameProject: string;

  @IsOptional()
  @Expose()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @Expose()
  startDate?: string;

  @IsOptional()
  @IsString()
  @Expose()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  @Expose()
  isCurrent?: boolean;
}
