import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './dtos';
import { TasksService } from './tasks.service';
import { PageDto, PaginationDto } from '@/common/dtos';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Query() pagination: PaginationDto): Promise<PageDto<TaskDto>> {
    return await this.tasksService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TaskDto> {
    return await this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() payload: CreateTaskDto) {
    return await this.tasksService.create(payload);
  }
}
