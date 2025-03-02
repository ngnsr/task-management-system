import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskListDto {
  @ApiProperty({
    description: 'The title of the task list',
    example: 'To Do',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The board ID the task list belongs to',
    example: '60d21b4667d0d8992e610c88',
  })
  @IsNotEmpty()
  board: Types.ObjectId;
}
