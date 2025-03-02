import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The title of the board',
    example: 'Q1 Marketing Campaign',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the board',
    example: 'Board for Q1 marketing campaigns tasks and planning',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The workspace ID the board belongs to',
    example: '60d21b4667d0d8992e610c87',
  })
  @IsNotEmpty()
  workspace: Types.ObjectId;
}
