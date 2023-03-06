/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserRoles } from './../../../util/API/UserRoles';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { InviteService } from './../domain/InviteService';
import { Invite } from './../domain/Invite';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddInviteDto } from '../data/dtos/AddInviteDto';
import { Role } from 'src/util/decorators/Role';

@Controller('invite')
export class InviteController {
  private service: InviteService;
  constructor() {
    this.service = new InviteService();
    this.service = DatabaseFactory.getRepository('invite');
  }
  @Post('/:id/event/:eventId')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.USER])
  inviteFriend(@Body() data: AddInviteDto, @Param('id') id: string,@Param('eventId') eventId: string) {
    data.invited = id;
    data.eventId = eventId
    return this.service.inviteFriend(data);
  }
  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.USER])
  getInvites() {
    return this.service.getInvites();
  }
}
