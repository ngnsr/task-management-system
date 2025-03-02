import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { BoardModule } from './modules/boards/boards.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FileModule } from './modules/files/files.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SearchModule } from './modules/search/search.module';
import { MongoModule } from './shared/mongo/mongo.module';
import { WorkspaceModule } from './modules/workspaces/workspaces.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    AuthModule,
    GatewayModule,
    UserModule,
    BoardModule,
    TaskModule,
    CommentsModule,
    FileModule,
    IntegrationsModule,
    NotificationsModule,
    AnalyticsModule,
    SearchModule,
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
