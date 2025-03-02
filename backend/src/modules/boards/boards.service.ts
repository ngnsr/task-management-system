import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '../../common/shemas';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = new this.boardModel(createBoardDto);
    return createdBoard.save();
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel
      .find()
      .populate('workspace')
      .populate('lists')
      .exec();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardModel
      .findById(id)
      .populate('workspace')
      .populate({
        path: 'lists',
        populate: {
          path: 'tasks',
        },
      })
      .exec();

    if (!board) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    return board;
  }

  async findByWorkspace(workspaceId: string): Promise<Board[]> {
    return this.boardModel
      .find({ workspace: new Types.ObjectId(workspaceId) })
      .populate('workspace')
      .populate('lists')
      .exec();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const updatedBoard = await this.boardModel
      .findByIdAndUpdate(id, updateBoardDto, { new: true })
      .exec();

    if (!updatedBoard) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    return updatedBoard;
  }

  async remove(id: string): Promise<Board> {
    const deletedBoard = await this.boardModel.findByIdAndDelete(id).exec();

    if (!deletedBoard) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    return deletedBoard;
  }
}
