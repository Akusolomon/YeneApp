import { AddFriendRequest } from './../data/dtos/AddFriendRequestDto';
export interface FriendRequest{
    cancelFriendRequest(recieverId:string)
    showFriendRequest()
    addFriendRequest(data:AddFriendRequest)
    acceptFriendRequest(senderId)
}