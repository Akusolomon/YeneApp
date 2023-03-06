import { UserRoles } from './../../../util/API/UserRoles';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { CommentService } from './../domain/CommentService';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddCommentDto } from '../data/dtos/AddCommentDto';
import { ReplayCommentDto } from '../data/dtos/ReplayCommentDto';
import { UpdateCommentDto } from '../data/dtos/UpdateCommentDto';
import { Comment } from '../domain/Comment';
import { Role } from 'src/util/decorators/Role';
@Controller('comment')
export class CommentController {
  private service: CommentService;

  constructor() {
    this.service = new CommentService();
    this.service = DatabaseFactory.getRepository('comment');
  }
  @Post(':id/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  comment(@Body() data: AddCommentDto, @Param('id') id: string) {
    data.commentedOn = id;
    return this.service.comment(data);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  updateComment(@Param('id') id: any, @Body() data: UpdateCommentDto) {
    return this.service.updateComment(id, data);
  }
  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  likeComment(@Param('id') id: any, data: any) {
    return this.service.likeComment(id, data);
  }
  @Post(':id/replay')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  replay(id: any, data: ReplayCommentDto) {
    return this.service.replay(id, data);
  }
}
