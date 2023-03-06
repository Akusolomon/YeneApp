import { AddLikeDto } from 'src/feature/likes/data/dtos/AddLikeDto';
import { LikeEntity } from './../../likes/data/model/LiketEntity';
import { ValidationException } from './../../../util/exception/ValidationException';
import { CommentEntity } from './model/CommentEntity';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Comment } from '../domain/Comment';
import { AuthenticatedUser } from './../../users/domain/AuthenticatedUser';
import { AddCommentDto } from './dtos/AddCommentDto';
import { ReplayCommentDto } from './dtos/ReplayCommentDto';
import { UpdateCommentDto } from './dtos/UpdateCommentDto';
export class CommentRepository implements Comment {
  async comment(data: AddCommentDto) {
    data.user = AuthenticatedUser.getInstance().userId;
    await CommentEntity.create(data);
  }
  async updateComment(id: any, data: UpdateCommentDto) {
    const comment: any = await CommentEntity.findById(id);
    if (data.body) {
      comment.body = data.body;
      await comment.save();
    }
  }
  async getComment(id) {
    const comments = await CommentEntity.find({ commentedOn: id }).populate(
      'user',
      'firstName lastName profile createdAt',
    );
    return comments;
  }
  async likeComment(id: any, data: AddLikeDto) {
    data.likedOn = id;
    data.onModel = 'Comment';
    data.user = AuthenticatedUser.getInstance().userId;
    await LikeEntity.create(data);
  }
  async replay(id: any, data: ReplayCommentDto) {
    const comment: any = await CommentEntity.findById(id);
    if (!comment) throw new ValidationException('Comment Not Found');
    data.user = AuthenticatedUser.getInstance().userId;
    comment.replay.push(data);
    await comment.save();
  }
}
