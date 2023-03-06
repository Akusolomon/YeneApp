/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationException } from './../../../util/exception/ValidationException';
import { User } from './../domain/User';
import { UserUpdateDto } from 'src/feature/users/data/dtos/UserUpdateDto';
import { AddProfile } from './../data/dtos/AddProfile';
import { UserRegisterDto } from './../data/dtos/UserRegisterDto';
import { UserRoles } from 'src/util/API/UserRoles';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { AuthenticatedUser } from './../domain/AuthenticatedUser';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Get,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../domain/UserService';
import { JwtSign } from 'src/util/auth/jwt/JwtSign';
import { Role } from 'src/util/decorators/Role';
import { ChangePasswordDto } from '../data/dtos/ChangePasswordDto';
import { UserLoginDto } from '../data/dtos/UserLoginDto';
import { ForgetPasswordDto } from '../data/dtos/ForgetPasswordDto';
import { changeUserPassword } from '../data/dtos/changeUserPassword';
import { MulterConfig } from 'src/util/file_upload/MulterConfig';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('user')
export class UserController implements User {
  private jwtService: JwtService;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.userService = DatabaseFactory.getRepository('user');
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIERS_IN,
      },
    });
  }
  getBlockedUsers() {
    return this.userService.getBlockedUsers();
  }
  block(id: string) {
    return this.userService.block(id);
  }
  unBlock(id: string) {
    return this.userService.unBlock(id);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() userLoginDto: UserLoginDto) {
    const userData = await this.userService.login(userLoginDto);
    let access_token;
    let user;
    if (userData) {
      access_token = new JwtSign(this.jwtService, {
        userId: userData.id,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
      }).execute();
      user = AuthenticatedUser.getInstance();
    }
    return { access_token, user };
  }

  @Post('forgetpassword')
  @UsePipes(ValidationPipe)
  forgetPassword(@Body() forgetPass: ForgetPasswordDto) {
    return this.userService.forgetPassword(forgetPass);
  }
  @Post(':id/password')
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.ADMIN])
  changeUserPassword(@Body() password: changeUserPassword, @Param('id') id) {
    return this.userService.changeUserPassword(id, password);
  }
  @Get('')
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.ADMIN, UserRoles.USER])
  getUsers(@Query() query) {
    return this.userService.getUsers(query);
  }

  @Get('deleted')
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.ADMIN]) //TODO
  getDeletedUsers(@Query() query) {
    return this.userService.getUsers(query, true);
  }
  @Delete('deactivate/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER, UserRoles.ADMIN])
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Post('unfriend/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  unFriend(@Param('id') id) {
    return this.userService.unFriend(id);
  }

  @Post('/changePassword')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  changePassword(@Body() password: ChangePasswordDto) {
    return this.userService.changePassword(password);
  }

  @Patch('/updateMe')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.USER])
  updateUser(@Body(ValidationPipe) userUpdate: UserUpdateDto) {
    return this.userService.updateUser(userUpdate);
  }

  @Patch('/:id/changePic')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', MulterConfig))
  changePic(@Param('id') id: string, @UploadedFile() photo) {
    if (!photo) {
      throw new ValidationException('Photo required');
    }
    return this.userService.changePic(id, photo.filename);
  }

  @Post('add')
  @UsePipes(ValidationPipe)
  async register(@Body() data: UserRegisterDto) {
    const userData: any = await this.userService.register(data);
    let access_token;
    if (userData) {
      access_token = new JwtSign(this.jwtService, {
        userId: userData.id,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
      }).execute();
    }
    const user = AuthenticatedUser.getInstance();
    return { access_token, user };
  }
  @Post('addProfile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profile', MulterConfig))
  @Role([UserRoles.USER])
  addProfile(@Body() profile: AddProfile, @UploadedFiles() files) {
    if (files) {
      profile.profile = files.filename;
    }
    return this.userService.addProfile(profile);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.USER])
  getMe() {
    return this.userService.getMe();
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.USER])
  getUserById(@Param('id') id) {
    return this.userService.getUserById(id);
  }
  @Post('/:id/reset')
  @UseGuards(JwtAuthGuard)
  @Role([UserRoles.ADMIN])
  changePasswordAd(@Body() reset: changeUserPassword, @Param('id') id) {
    return this.userService.changePasswordAd(id, reset);
  }

  @Get('/image/:file')
  getPhoto(@Res() res, @Param('file') file) {
    const fileName = 'uploads/images/' + file;
    return of(res.sendFile(join(process.cwd(), fileName)));
  }
}
