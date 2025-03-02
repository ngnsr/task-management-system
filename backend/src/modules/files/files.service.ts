import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from '../../common/shemas';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const newFile = new this.fileModel(createFileDto);
    return await newFile.save();
  }

  async findAll(): Promise<File[]> {
    return await this.fileModel.find().exec();
  }

  async findAllByTask(taskId: string): Promise<File[]> {
    return await this.fileModel
      .find({ task: new Types.ObjectId(taskId) })
      .exec();
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileModel.findById(id).exec();
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }

  async update(id: string, updateFileDto: UpdateFileDto): Promise<File> {
    const file = await this.fileModel
      .findByIdAndUpdate(id, updateFileDto, { new: true })
      .exec();

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return file;
  }

  async remove(id: string): Promise<File> {
    const file = await this.fileModel.findByIdAndDelete(id).exec();

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return file;
  }

  async findByFileType(fileType: string): Promise<File[]> {
    return await this.fileModel.find({ fileType }).exec();
  }

  async findByTags(tags: string[]): Promise<File[]> {
    return await this.fileModel.find({ tags: { $in: tags } }).exec();
  }
}
