import { Injectable } from '@nestjs/common';
import { AddCommentDto } from '../data/dtos/AddCommentDto';
import { ReplayCommentDto } from '../data/dtos/ReplayCommentDto';
import { UpdateCommentDto } from '../data/dtos/UpdateCommentDto';
import { Comment } from './Comment';

@Injectable()
export class CommentService implements Comment {
  getLikes(id: any) {
    throw new Error('Method not implemented.');
  }
  getComment(id: any) {
    throw new Error('Method not implemented.');
  }
  comment(data: AddCommentDto) {
    throw new Error('Method not implemented.');
  }
  updateComment(id: any, data: UpdateCommentDto) {
    throw new Error('Method not implemented.');
  }
  likeComment(id: any, data: any) {
    throw new Error('Method not implemented.');
  }
  replay(id: any, data: ReplayCommentDto) {
    throw new Error('Method not implemented.');
  }
}
