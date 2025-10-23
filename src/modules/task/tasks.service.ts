import { AppException, ErrorCodes } from '@/common';
import { PageDto, PaginationDto } from '@/common/dtos';
import { createPaginationResponse } from '@/common/helpers';
import { Task } from '@/entities/task.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dtos';
import { mapperTask } from './mappers';

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

    return createPaginationResponse(mappers, page, limit, total);
  }

  async findOne(id: number): Promise<TaskDto> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new AppException(ErrorCodes.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return mapperTask.toDto(task);
  }

  async create(payload: CreateTaskDto) {
    const saved = await this.tasksRepository.save(payload);
    return mapperTask.toDto(saved);
  }

  async update(id: number, payload: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new AppException(ErrorCodes.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.tasksRepository.update(id, payload);
    return this.findOne(id);
  }
}
