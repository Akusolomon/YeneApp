import { Injectable } from '@nestjs/common';
import { AttendEventDto } from '../data/AttendEventDto';

@Injectable()
export class EventGoingService {
  IsGoing(id: any) {
    throw new Error('Method not implemented.');
  }
  attendEvent(data: AttendEventDto) {
    throw new Error('Method not implemented.');
  }
}
