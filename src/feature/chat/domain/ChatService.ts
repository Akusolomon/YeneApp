import { ChatDto } from './../data/dto/ChatDto';
import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../data/ChatRepository';
import { Chat } from './Chat';

@Injectable()
export class ChatService implements Chat {
  private repository: Chat;
  deleteChat(id: any) {
    return this.repository.deleteChat(id);
  }
  addChat(chat: ChatDto) {
    return this.repository.addChat(chat);
  }
}
