import { UserEntity } from './../../users/data/model/UserEntity';
import { MomentEntity } from './model/MomentEntity';
import { AuthenticatedUser } from './../../users/domain/AuthenticatedUser';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ValidationException } from './../../../util/exception/ValidationException';
import { Moment } from '../domain/Moment';
import { AddMomentDto } from './dtos/AddMomentDto';
import { UpdateMomentDto } from './dtos/UpdateMomentDto';
import { APIFeatures } from 'src/util/API/Feature';
import { SystemErrorException } from 'src/util/exception/SystemErrorException';
export class MomentRepository implements Moment {
  private authUser = AuthenticatedUser.getInstance();
  async addMoment(data: AddMomentDto, media) {
    if (!(data.post || media)) {
      throw new ValidationException('please enter either post or media');
    }
    const medias = [];
    if (media) {
      for (const key in media) {
        if (Object.prototype.hasOwnProperty.call(media, key)) {
          const element = media[key];
          element.forEach(el => {
            medias.push(el.filename);
          });
        }
      }
    }
    //TODO Delete Hard Code
    data.media = medias;

    //TODO data.event  get event if the user was in the venue else throw err
    data.user = this.authUser.userId;
    const newData = await MomentEntity.create(data);
    return newData;
  }
  async updateMoment(id: any, data: UpdateMomentDto) {
    const newData = await MomentEntity.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return newData;
  }
  async deleteMoment(id: any) {
    const newData = await MomentEntity.findByIdAndUpdate(id, { active: false });
    return 'Deleted';
  }
  async getMomentById(id: string) {
    const moment = await MomentEntity.findById(id).populate('user');
    return moment;
  }
  async getMoments(query?: any, deleted?) {
    try {
      let moment = MomentEntity.find()
        .populate('user')
        .populate('comments')
        .populate('likes');
      if (deleted)
        moment = MomentEntity.find({ active: false }).populate('user');
      const momentFeatures = new APIFeatures(moment, query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const data = await momentFeatures.query;
      const user: any = await UserEntity.findById(this.authUser.userId);
      const newData = data.filter(item => {
        console.log(user.id,"and",item.user.id,item.user.id === user.id)
        return item.user.id === user.id ? true: user.friends.includes(item.user.id); 
      });
      return newData;
    } catch (err) {
      throw new SystemErrorException();
    }
  }
}
