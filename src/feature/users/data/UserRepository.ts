/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserUpdateDto } from 'src/feature/users/data/dtos/UserUpdateDto';
import { AddProfile } from './dtos/AddProfile';
import { changeUserPassword } from './dtos/changeUserPassword';
import { BadRequestException } from '@nestjs/common';
import { Exception } from './../../../util/exception/Exception';
import { AuthenticatedUser } from './../domain/AuthenticatedUser';
import { ForgetPasswordDto } from './dtos/ForgetPasswordDto';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';
import { ValidationException } from 'src/util/exception/ValidationException';
import { User } from '../domain/User';
import { UserLoginDto } from './dtos/UserLoginDto';
import { UserRegisterDto } from './dtos/UserRegisterDto';
import { UserEntity } from './model/UserEntity';
import { ChangePasswordDto } from './dtos/ChangePasswordDto';
import { APIFeatures } from 'src/util/API/Feature';
import { SystemErrorException } from 'src/util/exception/SystemErrorException';
import { Types } from 'mongoose';
import { UserRoles } from 'src/util/API/UserRoles';

export class UserRepository implements User {
  unBlock(id: string) {
    throw new Error('Method not implemented.');
  }
  private authUser = AuthenticatedUser.getInstance();
  async register(user: UserRegisterDto) {
    if (user.role == UserRoles.PLACE) {
      try {
        if (!user.companyName) {
          throw new ValidationException('CompanyName Is Required');
        }

        const newUser: any = await UserEntity.create(user);

        return newUser;
      } catch (err) {
        console.log(err);
        throw new ValidationException('Some Thing Went Wrong Please try Again');
      }
    }
    try {
      const newUser = await UserEntity.create(user);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ValidationException('Some Thing Went Wrong Please try Again');
    }
  }
  async addProfile(add: AddProfile) {
    try {
      const user: any = await UserEntity.findById(this.authUser.userId);
      if (add.bio) {
        user.bio = add.bio;
      }
      if (add.email) {
        user.bio = add.email;
      }
      if (add.profile) {
        user.profile = add.profile;
      }

      await user.save();
    } catch (err) {
      throw new ValidationException('Some Thing Went Wrong Please try Again');
    }
  }
  async getMe() {
    const me = await UserEntity.findById(this.authUser.userId)
      .populate({
        path: 'friends',
        select: 'firstName lastName',
        populate: {
          path: 'friends',
          select: 'firstName lastName',
          match: {
            _id: { $ne: this.authUser.userId },
          },
        },
      })
      .populate('event')
      .populate('friendRequest')
      .populate('going')
      .populate('moment');
    console.log(this.authUser, me);
    return me;
  }
  async deleteUser(id) {
    let user: any;
    if (this.authUser.role == 'ADMIN') user = await UserEntity.findById(id);
    if (this.authUser.role == 'USER')
      user = await UserEntity.findById(this.authUser.userId);
    if (!user) {
      throw new DataNotFoundException('User Not Found');
    }
    user.active = false;
    await user.save();
  }
  async getUsers(query?, deleted?) {
    try {
      let user = UserEntity.find()
        .populate('event')
        .populate('friends');
      if (deleted) user = UserEntity.find({ active: false });
      const userFeatures = new APIFeatures(user, query)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();

      const data = await userFeatures.query;
      return data;
    } catch (err) {
      throw new SystemErrorException();
    }
  }
  getBlockedUsers() {
    throw new Error('Method not implemented.');
  }
  block(id: string) {
    //TODO You Can Only Block Your Friends
  }
  async unFriend(id) {
    const friend: any = await UserEntity.findById(this.authUser.userId);
    if (!friend) throw new DataNotFoundException('User Not Found');
    for (let i = 0; i < friend.friends.length; i++) {
      if (friend.friends[i] == id) {
        console.log(friend.friends[i], '===', id);
        friend.friends.splice(i, 1);
      }
    }
    const unfriend: any = await UserEntity.findById(id);
    if (!unfriend) throw new DataNotFoundException('User Not Found');
    for (let i = 0; i < unfriend.friends.length; i++) {
      if (unfriend.friends[i] == this.authUser.userId) {
        console.log('un', unfriend.friends[i], '==', this.authUser.userId);
        unfriend.friends.splice(i, 1);
      }
    }
    await friend.save();
    await unfriend.save();
  }
  async forgetPassword(forgetPass: ForgetPasswordDto) {
    const user: any = await UserEntity.findOne(forgetPass);
    if (!user) {
      throw new DataNotFoundException(`email doesnt exist`);
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  }
  async login(userloginDto: UserLoginDto) {
    const { phone, password } = userloginDto;

    if (!phone || !password) {
      throw new ValidationException(`phone or Password Incorrect`);
    }

    const user: any = await UserEntity.findOne({
      $or: [{ phone: phone }, { email: phone }],
    }).select('+password');
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new ValidationException(`phone or Password incorrect`);
    }
    return user;
  }
  async getFriends() {
    const user: any = await UserEntity.findById(this.authUser.userId).populate(
      'friends',
    );
    return user.friends;
  }
  async getUserById(id) {
    const user: any = await UserEntity.findById(id)
      .populate('event')
      .populate('moment')
      .populate({
        path: 'friends',
        select: 'firstName lastName',
        populate: {
          path: 'friends',
          select: 'firstName lastName',
          match: {
            _id: { $ne: id },
          },
        },
      });
    if (!user) throw new ValidationException('User Not Found');
    let Isfriends = false;
    if (user.friends.includes(this.authUser.userId)) {
      Isfriends = true;
    }
    return { user, Isfriends };
  }
  async changePasswordAd(id, change: changeUserPassword) {
    const currentUser: any = await UserEntity.findById(id).select('+password');
    if (!currentUser) throw new DataNotFoundException('user Not Found');
    console.log(change.newPassword);
    currentUser.password = change.newPassword;
    await currentUser.save();
  }

  async changePic(id: string, profile: string) {
    const update_pic = await UserEntity.findByIdAndUpdate(id, { profile });
    if (!update_pic) throw new ValidationException('Cant find user');
    return 'Updated';
  }

  async updateUser(update: UserUpdateDto) {
    const user: any = await UserEntity.findById(this.authUser.userId);
    if (update.city) {
      user.city = update.city;
    }
    if (update.userName) {
      user.city = update.userName;
    }
    if (update.privacy) {
      user.privacy = update.privacy;
    }
    if (update.phone) {
      user.phone = update.phone;
    }
    if (update.email) {
      user.email = update.email;
    }
    if (update.firstName) {
      user.firstName = update.firstName;
    }
    if (update.lastName) {
      user.lastName = update.lastName;
    }
    await user.save();
  }

  async changePassword(change: ChangePasswordDto): Promise<void> {
    const currentUser: any = await UserEntity.findById(
      this.authUser.userId,
    ).select('+password');
    if (!currentUser) throw new DataNotFoundException('user Not Found');
    if (
      !(await currentUser.correctPassword(
        change.currentPassword,
        currentUser.password,
      ))
    ) {
      throw new ValidationException('Current Password Doesnt match');
    }
    if (!(change.newPassword === change.confirmPassword))
      throw new ValidationException('Password Doesnt match');
    currentUser.password = change.newPassword;
    await currentUser.save();
  }

  async changeUserPassword(id, change: changeUserPassword): Promise<void> {
    const currentUser: any = await UserEntity.findById(id).select('+password');
    if (!currentUser) throw new DataNotFoundException('user Not Found');
    currentUser.password = change.newPassword;
    await currentUser.save();
  }
}
