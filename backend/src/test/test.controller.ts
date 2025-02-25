import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestService } from './test.service';
import { TestCreateDto } from './test-create.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('create')
  create(@Body() body: TestCreateDto) {
    return this.testService.createTest(body.name);
  }

  @Get('all')
  findAll() {
    return this.testService.findAllTests();
  }
}
