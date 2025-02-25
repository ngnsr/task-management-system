import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestService } from './test.service';
import { TestSchema } from './test.schema';
import { TestController } from './test.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }])],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
