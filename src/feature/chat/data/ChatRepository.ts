import { ConversationDto } from './../conversation/data/dtos/ConversationDto';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { ConversationEntity } from './../conversation/data/model/ConversationEntity';
import { AuthenticatedUser } from './../../users/domain/AuthenticatedUser';
import { ChatDto } from './dto/ChatDto';
import { ChatEntity } from './model/ChatEntity';
export class ChatRepository {
  private conversationService;
  constructor() {
    this.conversationService = DatabaseFactory.getRepository('conversation');
  }
  async addChat(chat: ChatDto) {
    let convo: ConversationDto;
    chat.from = AuthenticatedUser.getInstance().userId;
    convo.user1 = chat.from;
    convo.user2 = chat.to;
    await this.conversationService.createConversation(convo);
    await ChatEntity.create(chat);
  }
}
