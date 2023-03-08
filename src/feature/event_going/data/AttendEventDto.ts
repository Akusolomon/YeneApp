import { IsNotEmpty, IsString } from 'class-validator';

export class AttendEventDto {
  event: string;
  user: string;
  ticketNo: string;
  isAttended: boolean;
}
