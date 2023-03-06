import { ValidationException } from './../../../util/exception/ValidationException';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticatedUser } from './../../users/domain/AuthenticatedUser';
import { AddLikeDto } from './dtos/AddLikeDto';
import { Like } from '../domain/Like';
import { LikeEntity } from './model/LiketEntity';

export class LikeRepository implements Like {
  private authUser = AuthenticatedUser.getInstance();

  async like(data: AddLikeDto) {
    data.user = this.authUser.userId;
    const liked = await LikeEntity.create(data);
    return liked;
  }
  async unLike(id) {
    await LikeEntity.findOneAndDelete({ likedOn: id });
  }

  async getLikes(id) {
    const likes = await LikeEntity.find({ likedOn: id });
    return likes;
  }
}
