import { Task } from '@/modules/users/entities/task.entity';
import { TaskDto } from '../dtos';

export const mapperTask = {
  toDto: (task: Task): TaskDto => {
    return {
      id: task.id,
      title: task.title,
      createdAt: task.createdAt ? task.createdAt.toISOString() : '',
      dueDate: task.dueDate ? task.dueDate.toISOString() : '',
      updatedAt: task.updatedAt ? task.updatedAt.toISOString() : '',
      description: task.description,
      isCompleted: task.isCompleted,
      priority: task.priority,
    };
  },
};
