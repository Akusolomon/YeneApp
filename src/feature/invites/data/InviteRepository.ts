import { DataNotFoundException } from './../../../util/exception/DataNotFoundException';
import { UserEntity } from './../../users/data/model/UserEntity';
import { AuthenticatedUser } from './../../users/domain/AuthenticatedUser';
import { InviteEntity } from './model/InviteEntity';
import { Invite } from './../domain/Invite';
import { AddInviteDto } from './dtos/AddInviteDto';
export class InviteRepository implements Invite{
    private authUser = AuthenticatedUser.getInstance()
    async inviteFriend(data: AddInviteDto) {
        data.invitor = this.authUser.userId
        const invited = await UserEntity.findById(data.invited)
        if(!invited) throw new DataNotFoundException("user Not found")  
        await InviteEntity.create(data)
    }
    async getInvites() {
        const invited = await InviteEntity.find({invited:this.authUser.userId})
        const invitor = await InviteEntity.find({invitor:this.authUser.userId})

        return {invited,invitor}
    }

}