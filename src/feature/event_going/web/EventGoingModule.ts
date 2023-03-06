import { EventGoingService } from './../domain/EventGoingService';
import { EventGoingController } from './EventGoingController';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [EventGoingController],
    providers: [EventGoingService],
})
export class EventGoingModule {}
