import { UserRoles } from './../../../../util/API/UserRoles';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  companyName: string;

  @IsNotEmpty()
  @IsOptional()
  email: string;
  interestedIn: string[];

  @IsNotEmpty()
  @IsOptional()
  userName: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: UserRoles;
}
