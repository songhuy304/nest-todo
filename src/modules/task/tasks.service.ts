import { Task } from '@/entities/task.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, TaskDto } from './dtos';
import { mapperTask } from './mappers';
import { ErrorCodes } from '@/common';
import { PageDto, PaginationDto } from '@/common/dtos';
import { buildPage } from '@/common/helpers';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(pagination: PaginationDto): Promise<PageDto<TaskDto>> {
    const { limit, page } = pagination;

    const [data, total] = await this.tasksRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const mappers = data.map((item) => mapperTask.toDto(item));

    return buildPage(mappers, page, limit, total);
  }

  async findOne(id: number): Promise<TaskDto> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return mapperTask.toDto(task);
  }

  async create(payload: CreateTaskDto) {
    const saved = await this.tasksRepository.save(payload);
    return mapperTask.toDto(saved);
  }
}
