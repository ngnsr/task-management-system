import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from 'src/common/shemas';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectModel(TaskList.name) private readonly taskListModel: Model<TaskList>,
  ) {}

  async create(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    const createdTaskList = new this.taskListModel(createTaskListDto);
    return createdTaskList.save();
  }

  async findAll(): Promise<TaskList[]> {
    return this.taskListModel.find().populate('board').populate('tasks').exec();
  }

  async findOne(id: string): Promise<TaskList> {
    const taskList = await this.taskListModel
      .findById(id)
      .populate('board')
      .populate('tasks')
      .exec();

    if (!taskList) {
      throw new NotFoundException(`TaskList with ID "${id}" not found`);
    }

    return taskList;
  }

  async findByBoard(boardId: string): Promise<TaskList[]> {
    return this.taskListModel
      .find({ board: new Types.ObjectId(boardId) })
      .populate('board')
      .populate('tasks')
      .exec();
  }

  async update(
    id: string,
    updateTaskListDto: UpdateTaskListDto,
  ): Promise<TaskList> {
    const updatedTaskList = await this.taskListModel
      .findByIdAndUpdate(id, updateTaskListDto, { new: true })
      .exec();

    if (!updatedTaskList) {
      throw new NotFoundException(`TaskList with ID "${id}" not found`);
    }

    return updatedTaskList;
  }

  async remove(id: string): Promise<TaskList> {
    const deletedTaskList = await this.taskListModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedTaskList) {
      throw new NotFoundException(`TaskList with ID "${id}" not found`);
    }

    return deletedTaskList;
  }
}
