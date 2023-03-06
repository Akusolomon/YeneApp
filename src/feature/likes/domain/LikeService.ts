import { Like } from './Like';
import { Injectable } from '@nestjs/common';
import { AddLikeDto } from '../data/dtos/AddLikeDto';

@Injectable()
export class LikeService implements Like {
  getLikes(id: any) {
    throw new Error('Method not implemented.');
  }
  like(data: AddLikeDto) {
    throw new Error('Method not implemented.');
  }
  unLike(id: any) {
    throw new Error('Method not implemented.');
  }
}
