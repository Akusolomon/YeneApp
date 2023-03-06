import { Injectable } from '@nestjs/common';
import { AddInviteDto } from '../data/dtos/AddInviteDto';

@Injectable()
export class InviteService {
    getInvites() {
        throw new Error('Method not implemented.');
    }
    inviteFriend(data: AddInviteDto) {
        throw new Error('Method not implemented.');
    }
}
