import { plainToInstance } from 'class-transformer';
import { Resume } from '@/modules/users/entities';
import { ResumeDto } from '../dtos/resume.dto';

export const resumeMapper = {
  toDto: (resume: Resume): ResumeDto => {
    return plainToInstance(ResumeDto, resume, {
      excludeExtraneousValues: true,
    });
  },
};
