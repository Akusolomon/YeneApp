import { DuplicateResouceFound } from './../../../util/exception/DuplicateResourceFound';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticatedUser } from 'src/feature/users/domain/AuthenticatedUser';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';
import { UserEntity } from './../../users/data/model/UserEntity';
import { FriendRequestEntity } from './model/FriendRequestEntity';
import { FriendRequest } from './../domain/FriendRequest';
import { AddFriendRequest } from './dtos/AddFriendRequestDto';
export class FriendRequestRepository implements FriendRequest {
  private authUser = AuthenticatedUser.getInstance();
  async addFriendRequest(data: AddFriendRequest) {
    data.sender = this.authUser.userId;
    await FriendRequestEntity.create(data);
  }

  async cancelFriendRequest(receiverId: string) {
    await FriendRequestEntity.findOneAndDelete({
      receiver: receiverId,
      sender: this.authUser.userId,
    });
  }
  async showFriendRequest() {
    const receiver = await FriendRequestEntity.find({
      receiver: this.authUser.userId,
    }).populate('sender', 'firstName lastName profile');
    return receiver;
  }
  async acceptFriendRequest(senderId: any) {
    const sender: any = await UserEntity.findById(senderId);
    if (!sender)
      throw new DataNotFoundException('This User Does noLongeer Exist');
    const me: any = await UserEntity.findById(this.authUser.userId);
    if (
      me.friends.includes(senderId) ||
      sender.friends.includes(this.authUser.userId)
    )
      throw new DuplicateResouceFound('Friends');
    me.friends.push(senderId);
    sender.friends.push(this.authUser.userId);
    await me.save();
    await sender.save();
    await FriendRequestEntity.findOneAndDelete({
      sender: senderId,
      receiver: this.authUser.userId,
    });
  }
}
