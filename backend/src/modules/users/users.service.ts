import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, Workspace } from 'src/common/shemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<Workspace>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      workspaces: [],
    });

    const savedUser = await newUser.save();

    const defaultWorkspace = new this.workspaceModel({
      name: `${createUserDto.username}'s Workspace`,
      description: `Default workspace for ${createUserDto.username}`,
      owner: savedUser._id,
      members: [savedUser._id],
    });

    const savedWorkspace = await defaultWorkspace.save();
    if (!savedWorkspace) throw new InternalServerErrorException('wtf');

    savedUser.workspaces = [savedWorkspace];
    await savedUser.save();

    return this.userModel.findById(savedUser._id).populate('workspaces').exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // If password is being updated, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return deletedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
