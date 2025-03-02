import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from '../../common/shemas';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new file record' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully created.',
    type: File,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files or filter by task' })
  @ApiQuery({
    name: 'taskId',
    required: false,
    description: 'Filter files by task ID',
  })
  @ApiQuery({
    name: 'fileType',
    required: false,
    description: 'Filter files by file type',
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'Filter files by tags (comma separated)',
  })
  @ApiResponse({ status: 200, description: 'Return all files.', type: [File] })
  findAll(
    @Query('taskId') taskId?: string,
    @Query('fileType') fileType?: string,
    @Query('tags') tags?: string,
  ) {
    if (taskId) {
      return this.fileService.findAllByTask(taskId);
    }

    if (fileType) {
      return this.fileService.findByFileType(fileType);
    }

    if (tags) {
      const tagArray = tags.split(',').map((tag) => tag.trim());
      return this.fileService.findByTags(tagArray);
    }

    return this.fileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a file by ID' })
  @ApiParam({ name: 'id', description: 'File ID' })
  @ApiResponse({ status: 200, description: 'Return the file.', type: File })
  @ApiResponse({ status: 404, description: 'File not found.' })
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a file by ID' })
  @ApiParam({ name: 'id', description: 'File ID' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully updated.',
    type: File,
  })
  @ApiResponse({ status: 404, description: 'File not found.' })
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file by ID' })
  @ApiParam({ name: 'id', description: 'File ID' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully deleted.',
    type: File,
  })
  @ApiResponse({ status: 404, description: 'File not found.' })
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
