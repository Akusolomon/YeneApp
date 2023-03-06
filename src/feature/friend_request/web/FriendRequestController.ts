import { UserRoles } from 'src/util/API/UserRoles';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { FriendRequestService } from '../domain/FriendRequestService';
import { FriendRequest } from './../domain/FriendRequest';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddFriendRequest } from '../data/dtos/AddFriendRequestDto';
import { Role } from 'src/util/decorators/Role';

@Controller('request')
export class FriendRequestController implements FriendRequest {
    private service:FriendRequestService

    constructor(){
        this.service = new FriendRequestService()
        this.service = DatabaseFactory.getRepository('friend')
    }
    @Post('/add')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Role([UserRoles.USER])
    addFriendRequest(@Body() data: AddFriendRequest) {
        return this.service.addFriendRequest(data)
    }
    @Post(':id/cancel')
    @UseGuards(JwtAuthGuard)
    @Role([UserRoles.USER])
    cancelFriendRequest(@Param('id') receivedId: string) {
        return this.service.cancelFriendRequest(receivedId)
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @Role([UserRoles.USER])
    showFriendRequest() {
        return this.service.showFriendRequest()
    }
    @Post(':id')
    @UseGuards(JwtAuthGuard)
    @Role([UserRoles.USER])
    acceptFriendRequest(@Param('id') senderId: any) {
        return this.service.acceptFriendRequest(senderId)
    }
}
