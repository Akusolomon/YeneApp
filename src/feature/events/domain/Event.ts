import { AddEventDto } from '../data/dtos/AddEventDto';
import { UpdateEventDto } from '../data/dtos/UpdateEventDto';

export interface Event {
  createEvent(event: AddEventDto, profile, images?);
  updateEvent(id, event: UpdateEventDto);
  getEvents(query?);
  deleteEvent(id: string);
  getEventById(id)
}
