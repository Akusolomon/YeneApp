import { UserEntity } from './../../users/data/model/UserEntity';
import { checkFriend } from './../../users/data/CheckFriend';
import { ValidationException } from 'src/util/exception/ValidationException';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';
import { AuthenticatedUser } from 'src/feature/users/domain/AuthenticatedUser';
import { EventEntity } from './model/EventEntity';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Event } from '../domain/Event';
import { AddEventDto } from './dtos/AddEventDto';
import { UpdateEventDto } from './dtos/UpdateEventDto';
import { APIFeatures } from 'src/util/API/Feature';
import { SystemErrorException } from 'src/util/exception/SystemErrorException';
export class EventRepository implements Event {
  private authUser = AuthenticatedUser.getInstance();
  filterObj(obj, ...allowedfield) {
    const newObj = {};

    Object.keys(obj).forEach(el => {
      if (allowedfield.includes(el)) {
        newObj[el] = obj[el];
      }
    });
    return newObj;
  }
  async createEvent(event: AddEventDto, profile, images?) {
    event.profile = profile.filename;
    event.user = this.authUser.userId;
    if (new Date(event.startDate) > new Date(event.endDate))
      throw new ValidationException('Please check ur Date'); //|| (new Date(Date.now()) < new Date(event.startDate) && Date.now() ) ))
    if (images) {
      const img = [];
      images.forEach(el => {
        console.log(el.filename);
        img.push(el.filename);
      });
      event.images = img;
    }
    await EventEntity.create(event);
  }
  async addImage(id, files) {
    const event: any = await EventEntity.findById(id);

    if (!event || !(event.user == this.authUser.userId)) {
      throw new ValidationException('Event Not Found or Not Allowed');
    }
    event.images.push(files);
    await event.save();
  }
  async updateEvent(id, event: UpdateEventDto) {
    const fields = this.filterObj(
      event,
      'title',
      'privacy',
      'type',
      'startDate',
      'endDate',
      'city',
      'venue',
      'fee',
      'profile',
      'location',
    );
    await EventEntity.findByIdAndUpdate(id, fields);
  }
  async getEvents(query?, deleted?) {
    try {
      const user: any = await UserEntity.findById(this.authUser.userId);
      let getEvent: any = EventEntity.find({ city: user.city })
        .populate('comments')
        .populate('likes')
        .populate('going');
      // getEvent.forEach(el => console.log(el.user));
      if (deleted) getEvent = EventEntity.find({ active: false });
      const Event = new APIFeatures(getEvent, query)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();

      const data = await Event.query;
      const filteredData = [];
      for (let i = 0; i < data.length; i++) {
        const found = await checkFriend(data[i].user);

        if (!found && data[i].privacy) {
          console.log('privacy');
          if (this.authUser.userId == data[i].user) filteredData.push(data[i]);
          continue;
        } else {
          console.log('pub');
          filteredData.push(data[i]);
        }
      }
      // for(let i = 0; i < filteredData.length; i++){
      //   const Isfriend = await checkFriend(filteredData[i].user);
      //   if()
      // }
      console.log(filteredData);
      return filteredData;
    } catch (err) {
      console.log(err);
      throw new SystemErrorException();
    }
  }

  async deleteEvent(id: string) {
    const found: any = await EventEntity.findById(id);
    if (!found) {
      throw new DataNotFoundException('Event Not Found');
    }
    found.active = false;
    await found.save();
  }

  async getEventById(id: string) {
    const event = await EventEntity.findById(id).populate('likes');
    if (!event) throw new DataNotFoundException('Event Not Found');
    return event;
  }
}
