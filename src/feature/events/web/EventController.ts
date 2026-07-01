import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { EventService } from './../domain/EventService';
import { ValidationException } from 'src/util/exception/ValidationException';
import * as exp from 'express';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MulterConfig } from 'src/util/file_upload/MulterConfig';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddEventDto } from '../data/dtos/AddEventDto';
import { UpdateEventDto } from '../data/dtos/UpdateEventDto';
import { Event } from '../domain/Event';
import { UserRoles } from 'src/util/API/UserRoles';
import { Role } from 'src/util/decorators/Role';

import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { of } from 'rxjs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { LikeService } from 'src/feature/likes/domain/LikeService';
import { CommentService } from 'src/feature/comments/domain/CommentService';
@Controller('event')
export class EventController implements Event {
  private service;
  private commentService: CommentService;
  private likeService: LikeService;
  constructor() {
    this.service = new EventService();
    this.service = DatabaseFactory.getRepository('event');
    this.commentService = new CommentService();
    this.commentService = DatabaseFactory.getRepository('comment');
    this.likeService = new LikeService();
    this.likeService = DatabaseFactory.getRepository('like');
  }
  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile', maxCount: 1 },
        { name: 'images', maxCount: 15 },
      ],
      MulterConfig,
    ),
  )
  @Role([UserRoles.USER])
  createEvent(
    @Body() event: AddEventDto,
    @UploadedFiles() files: { profile?; images? },
  ) {
    console.log(files);
    if (!files.profile[0]) {
      throw new ValidationException('Profile Is Required');
    }
    if (files.profile && files.images) {
      return this.service.createEvent(event, files.profile, files.images);
    }
    return this.service.createEvent(event, files.profile[0]);
  }
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  updateEvent(@Param('id') id, @Body() event: UpdateEventDto) {
    return this.service.updateEvent(id, event);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getEvents(@Query() query) {
    const data = this.service.getEvents(query);
    return data;
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getEventById(@Param('id') id) {
    console.log(id);
    return this.service.getEventById(id);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  deleteEvent(@Param('id') id: string) {
    return this.service.deleteEvent(id);
  }
  @Get('/image/:file')
  getPhoto(@Res() res, @Param('file') file) {
    const fileName = 'uploads/images/' + file;
    return of(res.sendFile(join(process.cwd(), fileName)));
  }

  @Get('deleted/event')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  getDeletedEvent(@Query() query) {
    return this.service.getEvents(query, true);
  }

  @Patch('addImage/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('images', MulterConfig))
  @Role([UserRoles.USER])
  addImages(@Param('id') id, @UploadedFile() images) {
    return this.service.addImage(id, images.filename);
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
