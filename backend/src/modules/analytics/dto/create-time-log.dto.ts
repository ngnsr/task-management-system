import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeLogDto {
  @ApiProperty({
    description: 'The start time of the log',
    example: '2023-01-15T09:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  // @Type(() => Date)
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the log',
    example: '2023-01-15T12:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  // @Type(() => Date)
  endTime?: Date;

  @ApiProperty({
    description: 'The task ID the time log is for',
    example: '60d21b4667d0d8992e610c89',
  })
  @IsNotEmpty()
  task: Types.ObjectId;
}
