import { ChatService } from './../domain/ChatService';
import { Module } from '@nestjs/common';
import { ChatController } from './ChatController';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
