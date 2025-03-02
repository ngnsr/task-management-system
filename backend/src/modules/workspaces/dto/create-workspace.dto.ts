import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: 'The name of the workspace',
    example: 'Marketing Team',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the workspace',
    example: 'Workspace for marketing team projects',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The user ID who owns the workspace',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  owner: Types.ObjectId;

  @ApiProperty({
    description: 'Array of user IDs who are members of the workspace',
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
    type: [String],
  })
  @IsArray()
  members: Types.ObjectId[];
}
