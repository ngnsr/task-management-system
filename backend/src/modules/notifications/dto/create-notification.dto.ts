import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'The notification message',
    example: 'Your task "Create social media content" has been updated',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The timestamp of the notification',
    example: '2023-01-15T09:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  timestamp?: Date;

  @ApiProperty({
    description: 'The user ID the notification is for',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  user: Types.ObjectId;
}
