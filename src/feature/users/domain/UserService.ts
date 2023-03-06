import { AddProfile } from './../data/dtos/AddProfile';
import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from '../data/dtos/ChangePasswordDto';
import { changeUserPassword } from '../data/dtos/changeUserPassword';
import { ForgetPasswordDto } from '../data/dtos/ForgetPasswordDto';
import { UserLoginDto } from '../data/dtos/UserLoginDto';
import { UserRegisterDto } from '../data/dtos/UserRegisterDto';
import { UserRepository } from '../data/UserRepository';
import { User } from './User';

@Injectable()
export class UserService implements User {
  changePic(id: string, filename: any) {
    throw new Error('Method not implemented.');
  }
  unFriend(id: any) {
    throw new Error('Method not implemented.');
  }
  changePasswordAd(id: any,reset) {
    throw new Error('Method not implemented.');
  }
  getUserById(id: any) {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }
  deleteEvent(id: string) {
    throw new Error('Method not implemented.');
  }
  unBlock(id: string) {
    return this.repository.unBlock(id)
  }
  getUsers(query?: any,deleted?) {
    return this.repository.getUsers(query)
  }
  private repository: UserRepository;
  updateUser(userUpdate: any) {
    return this.repository.updateUser(userUpdate)
  }
  getMe() {
    return this.repository.getMe();
  }
  changePassword(password: ChangePasswordDto) {
    return this.repository.changePassword(password);
  }
  addProfile(profile: AddProfile) {
    return this.repository.addProfile(profile);
  }
  changeUserPassword(id, password: changeUserPassword) {
    return this.repository.changeUserPassword(id, password);
  }
  register(user: UserRegisterDto) {
    return this.repository.register(user);
  }
  getBlockedUsers() {
    return this.repository.getBlockedUsers;
  }
  login(userloginDto: UserLoginDto) {
    return this.repository.login(userloginDto);
  }
  forgetPassword(forgetPass: ForgetPasswordDto) {
    return this.repository.forgetPassword(forgetPass);
  }
  block(id: string) {
    return this.repository.block(id);
  }
}
