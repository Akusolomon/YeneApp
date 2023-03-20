import { ChatDto } from './../data/dto/ChatDto';
export interface Chat {
  addChat(chat: ChatDto);
  deleteChat(id);
  //updateChat(chat: ChatUpdateDto, id);
}
