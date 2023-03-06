import { InviteService } from './../domain/InviteService';
import { InviteController } from './InviteController';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [InviteController],
    providers: [InviteService],
})
export class InviteModule {}
