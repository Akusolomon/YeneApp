import { AddInviteDto } from "../data/dtos/AddInviteDto";

export interface Invite{
    inviteFriend(data:AddInviteDto)
    getInvites()
}