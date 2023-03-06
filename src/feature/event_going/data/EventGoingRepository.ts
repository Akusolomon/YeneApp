import { UserEntity } from './../../users/data/model/UserEntity';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ValidationException } from 'src/util/exception/ValidationException';
import { EventEntity } from './../../events/data/model/EventEntity';
import { AuthenticatedUser } from 'src/feature/users/domain/AuthenticatedUser';
import { EventGoingEntity } from './model/EventGoingEntity';
import { EventGoing } from '../domain/EventGoing';
import { AttendEventDto } from './AttendEventDto';

export class EventGoingRepository implements EventGoing {
  private authUser = AuthenticatedUser.getInstance();
  async attendEvent(data: AttendEventDto) {
    const event: any = await EventEntity.findById(data.event);
    if (event.endDate < Date.now())
      throw new ValidationException('Finished Event');
    data.user = this.authUser.userId;
    return await EventGoingEntity.create(data);
  }
  async IsGoing(id) {
    const going = await EventGoingEntity.find({
      event: id,
      user: this.authUser.userId,
    });
    const user = await UserEntity.aggregate([
      {
        $unwind: '$friends',
      },
      {
        $match: {},
      },
    ]);
    return going;
  }
}
