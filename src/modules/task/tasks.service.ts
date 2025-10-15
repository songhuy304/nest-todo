import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask } from './interfaces';

@Injectable()
export class TasksService {
  private readonly task: ITask[] = [];

  create(task: ITask) {
    this.task.push(task);
  }

  getAll(): ITask[] {
    return this.task;
  }

  getOne(id: string) {
    const task = this.task.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }
}
