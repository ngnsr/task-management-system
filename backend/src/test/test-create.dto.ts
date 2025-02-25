import { ApiProperty } from '@nestjs/swagger';

export class TestCreateDto {
  @ApiProperty()
  name: string;
}
