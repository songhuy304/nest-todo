import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CertificationResumeDto,
  EducationResumeDto,
  ExperienceResumeDto,
  PersonalInformationResumeDto,
  ProjectResumeDto,
} from './';
import { Type } from 'class-transformer';

export class CreateResumeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @ValidateNested()
  @Type(() => PersonalInformationResumeDto)
  personalInformation: PersonalInformationResumeDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceResumeDto)
  experiences?: ExperienceResumeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationResumeDto)
  educations?: EducationResumeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectResumeDto)
  projects?: ProjectResumeDto[];

  @IsOptional()
  @IsString()
  skill?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationResumeDto)
  certifications?: CertificationResumeDto[];
}
