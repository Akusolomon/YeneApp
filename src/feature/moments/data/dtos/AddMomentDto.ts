import { IsOptional } from 'class-validator';

export class AddMomentDto {
  event: string;

  media: string[];

  privacy: boolean;

  user: string;

  post: string;
}
