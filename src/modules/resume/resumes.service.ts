import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto, ResumeDto } from './dtos';
import { Resume } from './entities';
import { resumeMapper } from './mappers';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}

  async findResumeByUser(userId: number): Promise<Resume | null> {
    const resume = await this.resumeRepository.findOneBy({
      user: { id: userId },
    });
    return resume ?? null;
  }

  async getResume(userId: number): Promise<ResumeDto | null> {
    const resume = await this.findResumeByUser(userId);
    if (!resume) return null;
    return resumeMapper.toDto(resume);
  }

  async upsertResume(
    userId: number,
    createResumeDto: CreateResumeDto,
  ): Promise<ResumeDto> {
    const existingResume = await this.findResumeByUser(userId);

    if (existingResume) {
      const updatedResume = await this.resumeRepository.save({
        ...existingResume,
        ...createResumeDto,
      });
      return resumeMapper.toDto(updatedResume);
    } else {
      const resume = this.resumeRepository.create({
        ...createResumeDto,
        user: { id: userId },
      });
      const savedResume = await this.resumeRepository.save(resume);
      return resumeMapper.toDto(savedResume);
    }
  }
}
