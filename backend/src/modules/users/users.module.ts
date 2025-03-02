import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  User,
  UserSchema,
  Workspace,
  WorkspaceSchema,
} from 'src/common/shemas';
import { WorkspaceModule } from '../workspaces/workspaces.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    WorkspaceModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
