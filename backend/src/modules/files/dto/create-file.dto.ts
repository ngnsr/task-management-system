import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { FileType } from '../../../common/enums/file-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    description: 'The original name of the file',
    example: 'project_report.pdf',
  })
  @IsNotEmpty()
  @IsString()
  originalName: string;

  @ApiProperty({
    description: 'The system-generated filename',
    example: '1615478963_project_report.pdf',
  })
  @IsNotEmpty()
  @IsString()
  filename: string;

  @ApiProperty({
    description: 'The type of the file',
    enum: FileType,
    example: FileType.document,
  })
  @IsNotEmpty()
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty({
    description: 'The MIME type of the file',
    example: 'application/pdf',
  })
  @IsNotEmpty()
  @IsString()
  mimeType: string;

  @ApiProperty({
    description: 'The URL to access the file',
    example: 'https://storage.example.com/files/1615478963_project_report.pdf',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'The task ID the file is attached to',
    example: '60d21b4667d0d8992e610c89',
  })
  @IsNotEmpty()
  task: Types.ObjectId;

  @ApiProperty({
    description: 'The size of the file in bytes',
    example: 1024567,
  })
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty({
    description: 'Description of the file',
    example: 'Final version of the project report',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Tags for the file',
    example: ['report', 'final', 'project'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
