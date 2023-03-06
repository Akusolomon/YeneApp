import { FriendRequest } from './FriendRequest';
import { Injectable } from '@nestjs/common';
import { AddFriendRequest } from '../data/dtos/AddFriendRequestDto';

@Injectable()
export class FriendRequestService implements FriendRequest{
    addFriendRequest(data: AddFriendRequest) {
        throw new Error('Method not implemented.');
    }
    cancelFriendRequest(recieverId: string) {
        throw new Error('Method not implemented.');
    }
    showFriendRequest() {
        throw new Error('Method not implemented.');
    }
    acceptFriendRequest(senderId: any) {
        throw new Error('Method not implemented.');
    }
}
