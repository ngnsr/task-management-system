import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskListsService } from './task-list.service';
@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListsService.create(createTaskListDto);
  }

  @Get()
  findAll() {
    return this.taskListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskListsService.findOne(id);
  }

  @Get('board/:boardId')
  findByBoard(@Param('boardId') boardId: string) {
    return this.taskListsService.findByBoard(boardId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskListDto: UpdateTaskListDto,
  ) {
    return this.taskListsService.update(id, updateTaskListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListsService.remove(id);
  }
}
