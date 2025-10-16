import { Task } from '@/entities/task.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, TaskDto } from './dtos';
import { mapperTask } from './mappers';
import { ErrorCodes } from '@/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map(mapperTask.toDto);
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
