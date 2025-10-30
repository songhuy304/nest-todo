import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dtos';
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
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateTaskDto,
  ): Promise<TaskDto> {
    return await this.tasksService.update(id, payload);
  }
}
