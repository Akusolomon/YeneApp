import { DataNotFoundException } from './../../../../util/exception/DataNotFoundException';
import { AuthenticatedUser } from './../../../users/domain/AuthenticatedUser';
import { ConversationDto } from './dtos/ConversationDto';
import { ConversationEntity } from './model/ConversationEntity';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class ConversationRepository {
  async createConversation(convo: ConversationDto) {
    convo.user1 = AuthenticatedUser.getInstance().userId;
    console.log(convo);
    let conversation: any = await ConversationEntity.findOne({
      $or: [
        {
          $and: [{ user1: convo.user1 }, { user2: convo.user2 }],
        },
        {
          $and: [{ user1: convo.user2 }, { user2: convo.user1 }],
        },
      ],
    }).populate(['user1', 'user2']);
    console.log(conversation);
    if (conversation) {
      //do nothing
    } else {
      conversation = await ConversationEntity.create(convo);
      conversation = conversation.populate(['user1', 'user2']);
    }
    return conversation;
  }

  async getAllConversation() {
    const convos = await ConversationEntity.find({
      $or: [
        {
          user_1: AuthenticatedUser.getInstance().userId,
        },
        {
          user_2: AuthenticatedUser.getInstance().userId,
        },
      ],
    }).populate(['user1', 'user2']);

    return convos;
  }

  async showConversation(id) {
    const convo = await ConversationEntity.findById(id).populate([
      'user1',
      'user2',
    ]);
    return convo;
  }
  async deleteConversation(id) {
    try {
      await ConversationEntity.findByIdAndDelete(id);
      //TODO   await MessageEntity.deleteMany({ conversation_id: id });
      return 'deleted';
    } catch (err) {
      throw new DataNotFoundException('Data Not Found');
    }
  }
}
