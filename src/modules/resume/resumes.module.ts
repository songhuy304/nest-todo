import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities';
import { ResumesService } from './resumes.service';
import { UsersModule } from '../users';
import { ResumesController } from './resumes.controller';

@Module({
  providers: [ResumesService],
  exports: [ResumesService],
  controllers: [ResumesController],
  imports: [TypeOrmModule.forFeature([Resume]), UsersModule],
})
export class ResumesModule {}
