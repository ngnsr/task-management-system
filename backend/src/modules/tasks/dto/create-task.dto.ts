import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TaskStatus } from '../../../common/enums/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Create social media content',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Create content for Instagram and Facebook posts for Q1 campaign',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    default: TaskStatus.toDo,
    example: TaskStatus.toDo,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.toDo;

  @ApiProperty({
    description: 'The user ID assigned to the task',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  user: Types.ObjectId;

  @ApiProperty({
    description: 'The parent task ID if this is a subtask',
    example: '60d21b4667d0d8992e610c89',
    required: false,
  })
  @IsOptional()
  parentTask?: Types.ObjectId;
}
