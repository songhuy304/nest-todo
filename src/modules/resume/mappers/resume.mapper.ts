import { plainToInstance } from 'class-transformer';
import { ResumeDto } from '../dtos/resume.dto';
import { Resume } from '../entities';

export const resumeMapper = {
  toDto: (resume: Resume): ResumeDto => {
    return plainToInstance(ResumeDto, resume, {
      excludeExtraneousValues: true,
    });
  },
};
