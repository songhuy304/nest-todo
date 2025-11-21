import { Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class PersonalInformationResumeDto {
  @IsString()
  @Expose()
  fullName: string;

  @IsOptional()
  @IsString()
  @Expose()
  summary?: string;

  @IsOptional()
  @IsString()
  @Expose()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Expose()
  linkedinLink?: string;

  @IsOptional()
  @IsString()
  @Expose()
  githubLink?: string;

  @IsOptional()
  @IsString()
  @Expose()
  otherLink?: string;
}
