import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from 'src/common/shemas';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [WorkspacesService],
})
export class WorkspaceModule {}
