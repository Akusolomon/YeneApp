/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { ChatService } from './../domain/ChatService';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { ChatDto } from '../data/dto/ChatDto';

@Controller('chat')
export class ChatController {
  private service: ChatService;

  constructor() {
    this.service = new ChatService();
    this.service = DatabaseFactory.getRepository('chat');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  addChat(@Body() chat: ChatDto) {
    return this.service.addChat(chat);
  }
}
