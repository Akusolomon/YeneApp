import {
  IsString,
  IsOptional,
  MinLength,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsBoolean()
  privacy: boolean;

  @IsOptional()
  @IsBoolean()
  dateOfBirth: Date;
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  city: string;
}
