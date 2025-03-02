import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //   UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
// Assuming you will have some authentication guard
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('boards')
// @UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Get('workspace/:workspaceId')
  findByWorkspace(@Param('workspaceId') workspaceId: string) {
    return this.boardService.findByWorkspace(workspaceId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
