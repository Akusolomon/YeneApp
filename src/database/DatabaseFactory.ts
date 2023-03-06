import { EventGoingRepository } from './../feature/event_going/data/EventGoingRepository';
import { CategoryRepository } from 'src/feature/categories/data/CategoryRepository';
import { EventRepository } from './../feature/events/data/EventRepository';
import { DataNotFoundException } from './../util/exception/DataNotFoundException';
import { UserRepository } from 'src/feature/users/data/UserRepository';
import { MomentRepository } from 'src/feature/moments/data/MomentRepository';
import { FriendRequestRepository } from 'src/feature/friend_request/data/FriendRequestRepository';
import { InviteRepository } from 'src/feature/invites/data/InviteRepository';
import { CommentRepository } from 'src/feature/comments/data/CommentRepository';
import { LikeRepository } from 'src/feature/likes/data/LikeRepository';

export class DatabaseFactory {
  static getRepository(feature: string): any {
    feature = feature.toUpperCase();
    let repository: any;
    switch (feature) {
      case 'USER':
        repository = new UserRepository();
        break;
      case 'COMMENT':
        repository = new CommentRepository();
        break;
      case 'LIKE':
        repository = new LikeRepository();
        break;
      case 'EVENT':
        repository = new EventRepository();
        break;
      case 'INVITE':
        repository = new InviteRepository();
        break;
      case 'FRIEND':
        repository = new FriendRequestRepository();
        break;
      case 'CATEGORY':
        repository = new CategoryRepository();
        break;
      case 'MOMENT':
        repository = new MomentRepository();
        break;
      case 'EVENTGOING':
        repository = new EventGoingRepository();
        break;
      default:
        throw new DataNotFoundException('Repository not found');
    }
    return repository;
  }
}
