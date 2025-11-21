import { IsString, IsOptional } from 'class-validator';

export class PersonalInformationResumeDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  linkedinLink?: string;

  @IsOptional()
  @IsString()
  githubLink?: string;

  @IsOptional()
  @IsString()
  otherLink?: string;
}
