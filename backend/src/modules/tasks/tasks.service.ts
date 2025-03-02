import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from 'src/common/shemas';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);

    // If this is a subtask, update the parent task
    if (createTaskDto.parentTask) {
      await this.taskModel.findByIdAndUpdate(createTaskDto.parentTask, {
        $push: { subtasks: createdTask._id },
      });
    }

    return createdTask.save();
  }

  async findAll(status?: string): Promise<Task[]> {
    const query = status ? { status } : {};

    return this.taskModel
      .find(query)
      .populate('user', 'username email')
      .populate('parentTask')
      .populate('subtasks')
      .populate('timeLogs')
      .populate('files')
      .exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate('user', 'username email')
      .populate('parentTask')
      .populate('subtasks')
      .populate('timeLogs')
      .populate('files')
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async findByUser(userId: string, status?: string): Promise<Task[]> {
    const query: any = { user: new Types.ObjectId(userId) };

    if (status) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      query.status = status;
    }

    return this.taskModel
      .find(query)
      .populate('user', 'username email')
      .populate('parentTask')
      .populate('subtasks')
      .populate('timeLogs')
      .populate('files')
      .exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return updatedTask;
  }

  async remove(id: string) {
    // First check if this task exists
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Remove this task from parent if it's a subtask
    if (task.parentTask) {
      await this.taskModel.findByIdAndUpdate(task.parentTask, {
        $pull: { subtasks: id },
      });
    }

    // Delete all subtasks
    // probably don't needed
    // if (task.subtasks && task.subtasks.length > 0) {
    //   await Promise.all(
    //     task.subtasks.map((subtaskId) => this.remove(subtaskId.id)),
    //   );
    // }

    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
