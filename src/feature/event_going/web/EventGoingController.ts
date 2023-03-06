import { UserRoles } from './../../../util/API/UserRoles';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { EventGoingService } from './../domain/EventGoingService';
import { EventGoing } from './../domain/EventGoing';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AttendEventDto } from '../data/AttendEventDto';
import { Role } from 'src/util/decorators/Role';

@Controller('eventgoing')
export class EventGoingController {
  private service: EventGoingService;
  constructor() {
    this.service = new EventGoingService();
    this.service = DatabaseFactory.getRepository('eventgoing');
  }
  @Post('/:id/going')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  attendEvent(@Body() data: AttendEventDto, @Param('id') id: string) {
    data.event = id;
    return this.service.attendEvent(data);
  }
  @Get('/:id/going')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  IsGoing(@Param('id') id) {
    return this.service.IsGoing(id);
  }
}
