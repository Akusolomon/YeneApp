import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNotEmpty()
  //TODO
  code: number;

  @IsNotEmpty()
  privacy: boolean;

  user: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  city: string;

  // @IsNotEmpty()
  // @IsString()
  //TODO
  venue: string;

  @IsOptional()
  fee: number;

  @IsOptional()
  description: string;

  profile: string;

  age: number;

  // @IsNotEmpty()
  //TODO
  location: number[];

  images: string[];
}
