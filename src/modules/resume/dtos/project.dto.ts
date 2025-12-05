import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ProjectResumeDto {
  @Expose()
  @IsString()
  nameProject: string;

  @IsOptional()
  @Expose()
  @IsString()
  projectDescription?: string;

  @IsOptional()
  @IsString()
  @Expose()
  startDate?: string;

  @IsOptional()
  @IsString()
  @Expose()
  endDate?: string;

  @IsOptional()
  @IsString()
  @Expose()
  role?: string;
}
