import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskListSchema, Task, TaskList, TaskSchema } from 'src/common/shemas';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskListsService } from './task-list.service';
import { TaskListsController } from './task-lists.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskList.name, schema: TaskListSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [TasksController, TaskListsController],
  providers: [TasksService, TaskListsService],
  exports: [TasksService, TaskListsService],
})
export class TaskModule {}
