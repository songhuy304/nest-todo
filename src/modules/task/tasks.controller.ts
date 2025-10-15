import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos';
import { TasksService } from './tasks.service';
import { ITask } from './interfaces';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): ITask[] {
    return this.tasksService.getAll();
  }

  @Post()
  @HttpCode(204)
  create(@Body() createDto: CreateTaskDto) {
    return {
      createDto,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}
