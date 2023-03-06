import { FriendRequestService } from '../domain/FriendRequestService';
import { FriendRequestController } from './FriendRequestController';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [FriendRequestController],
    providers: [FriendRequestService],
})
export class FriendRequestModule {}
