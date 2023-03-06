import { AuthenticatedUser } from './../domain/AuthenticatedUser';
import { UserEntity } from './model/UserEntity';
export const checkFriend = async user => {
  const found: any = await UserEntity.findById(
    AuthenticatedUser.getInstance().userId,
  );
  return found.friends.includes(user);
};
