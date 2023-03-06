import { Injectable } from '@nestjs/common';
import { AddEventDto } from '../data/dtos/AddEventDto';
import { UpdateEventDto } from '../data/dtos/UpdateEventDto';
import {Event} from './Event'
@Injectable()
export class EventService implements Event {
    createEvent(event: AddEventDto, profile: any, images?: any) {
        throw new Error('Method not implemented.');
    }
    updateEvent(id: any, event: UpdateEventDto) {
        throw new Error('Method not implemented.');
    }
    getEvents() {
        throw new Error('Method not implemented.');
    }
    getDeletedEvent(){
        throw new Error('Method not implemented.'); 
    }
    getEventById(id){
        throw new Error('Method not implemented.');
    }
    deleteEvent(id: string) {
        throw new Error('Method not implemented.');
    }
}
