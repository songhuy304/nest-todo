import { User } from '@/common/decorator';
import type { JwtUser } from '@/common/interfaces';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateResumeDto, ResumeDto } from './dtos';
import { ResumesService } from './resumes.service';

@Controller('user')
export class ResumesController {
  constructor(private resumesService: ResumesService) {}

  @Get('/resume')
  async getResume(@User() req: JwtUser): Promise<ResumeDto | null> {
    return this.resumesService.getResume(req.id);
  }

  @Post('/resume')
  async upsertResume(
    @User() req: JwtUser,
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<ResumeDto> {
    return this.resumesService.upsertResume(req.id, createResumeDto);
  }
}
