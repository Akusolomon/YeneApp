import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AddProfile {
  @IsOptional()
  @IsString()
  profile: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
