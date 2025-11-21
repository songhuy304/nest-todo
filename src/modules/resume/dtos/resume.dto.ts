import { toIso } from '@/common/helpers';
import { Expose, Transform, Type } from 'class-transformer';
import {
  CertificationResumeDto,
  EducationResumeDto,
  ExperienceResumeDto,
  PersonalInformationResumeDto,
  ProjectResumeDto,
} from './';

export class ResumeDto {
  @Expose()
  id: number;

  @Expose()
  url?: string;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  @Type(() => PersonalInformationResumeDto)
  personalInformation?: PersonalInformationResumeDto;

  @Expose()
  @Type(() => ExperienceResumeDto)
  experiences?: ExperienceResumeDto[];

  @Expose()
  @Type(() => EducationResumeDto)
  educations?: EducationResumeDto[];

  @Expose()
  @Type(() => ProjectResumeDto)
  projects?: ProjectResumeDto[];

  @Expose()
  skill?: string;

  @Expose()
  @Type(() => CertificationResumeDto)
  certifications?: CertificationResumeDto[];

  @Expose()
  @Transform(({ value }) => toIso(value), { toPlainOnly: true })
  createdAt?: string;

  @Expose()
  @Transform(({ value }) => toIso(value), { toPlainOnly: true })
  updatedAt?: string;
}
