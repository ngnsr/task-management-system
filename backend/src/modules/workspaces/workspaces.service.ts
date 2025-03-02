import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from 'src/common/shemas';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<Workspace>,
  ) {}

  get Model() {
    return this.workspaceModel;
  }

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
    return createdWorkspace.save();
  }

  async findAll(): Promise<Workspace[]> {
    return this.workspaceModel
      .find()
      .populate('owner', 'username email')
      .populate('members', 'username email')
      .populate('boards')
      .exec();
  }

  async findOne(id: string): Promise<Workspace> {
    const workspace = await this.workspaceModel
      .findById(id)
      .populate('owner', 'username email')
      .populate('members', 'username email')
      .populate('boards')
      .exec();

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }

    return workspace;
  }

  async findByUser(userId: string): Promise<Workspace[]> {
    return this.workspaceModel
      .find({
        $or: [
          { owner: new Types.ObjectId(userId) },
          { members: new Types.ObjectId(userId) },
        ],
      })
      .populate('owner', 'username email')
      .populate('members', 'username email')
      .populate('boards')
      .exec();
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    const updatedWorkspace = await this.workspaceModel
      .findByIdAndUpdate(id, updateWorkspaceDto, { new: true })
      .exec();

    if (!updatedWorkspace) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }

    return updatedWorkspace;
  }

  async remove(id: string): Promise<Workspace> {
    const deletedWorkspace = await this.workspaceModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedWorkspace) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }

    return deletedWorkspace;
  }
}
