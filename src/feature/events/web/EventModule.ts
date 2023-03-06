import { EventService } from './../domain/EventService';
import { Module } from '@nestjs/common';
import { EventController } from './EventController';

@Module({
    imports: [],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
