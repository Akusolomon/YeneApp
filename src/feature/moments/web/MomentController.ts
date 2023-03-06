import { LikeService } from './../../likes/domain/LikeService';
import { CommentService } from './../../comments/domain/CommentService';
import { ValidationException } from './../../../util/exception/ValidationException';
import { UserRoles } from './../../../util/API/UserRoles';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddMomentDto } from '../data/dtos/AddMomentDto';
import { UpdateMomentDto } from '../data/dtos/UpdateMomentDto';
import { Moment } from '../domain/Moment';
import { MomentService } from '../domain/MomentService';
import { Post } from '@nestjs/common';
import { MulterConfig } from 'src/util/file_upload/MulterConfig';
import { Role } from 'src/util/decorators/Role';
import { UploadedFiles } from '@nestjs/common';
import { join } from 'path';
import { of } from 'rxjs';
import { AuthenticatedUser } from 'src/feature/users/domain/AuthenticatedUser';

@Controller('moment')
export class MomentController implements Moment {
  private service: MomentService;
  private commentService: CommentService;
  private likeService: LikeService;

  constructor() {
    this.service = new MomentService();
    this.service = DatabaseFactory.getRepository('moment');
    this.commentService = new CommentService();
    this.commentService = DatabaseFactory.getRepository('comment');
    this.likeService = new LikeService();
    this.likeService = DatabaseFactory.getRepository('like');
  }
  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'medias', maxCount: 15 }], MulterConfig),
  )
  @Role([UserRoles.USER])
  addMoment(@Body() data: AddMomentDto, @UploadedFiles() medias: any) {
    if (!data.event) throw new ValidationException('Event Is Required');

    return this.service.addMoment(data, medias);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  updateMoment(@Param('id') id: any, @Body() data: UpdateMomentDto) {
    return this.service.updateMoment(id, data);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  deleteMoment(@Param('id') id: any) {
    return this.service.deleteMoment(id);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getMomentById(@Param('id') id: string) {
    return this.service.getMomentById(id);
  }

  @Get('/image/:file')
  getPhoto(@Res() res, @Param('file') file) {
    const fileName = 'uploads/images/' + file;
    return of(res.sendFile(join(process.cwd(), fileName)));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getMoments(@Query() query?: any, deleted?: any) {
    return this.service.getMoments(query);
  }

  @Get('comment/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getComment(@Param('id') id) {
    return this.commentService.getComment(id);
  }
  @Get('like/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getLikes(@Param('id') id) {
    return this.likeService.getLikes(id);
  }
}
