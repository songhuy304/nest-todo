import { AppException, ErrorCodes } from '@/common';
import { Resume, User } from '@/modules/users/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumeDto, UserDto } from './dtos';
import { mapperUser, resumeMapper } from './mappers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private resumeRepository: Repository<Resume>,
  ) {}

  async getMe(userId: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new AppException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return mapperUser.toDto(user);
  }

  async getResume(userId: number): Promise<ResumeDto | null> {
    const resume = await this.resumeRepository.findOne({
      where: {
        user: { id: userId },
      },
    });

    if (!resume) return null;

    return resumeMapper.toDto(resume);
  }
}
