/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConversationService } from './../domain/ConversatioService';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { ConversationDto } from '../data/dtos/ConversationDto';

@Controller('conversation')
export class ConversationController {
  private service: ConversationService;

  constructor() {
    this.service = new ConversationService();
    this.service = DatabaseFactory.getRepository('conversation');
  }

  @Post(':id/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createConversation(@Body() convo: ConversationDto, @Param('id') id) {
    convo.user2 = id;
    return this.service.createConversation(convo);
  }
}
