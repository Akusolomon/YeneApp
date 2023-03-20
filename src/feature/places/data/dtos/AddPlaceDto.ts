import { IsNotEmpty, IsString } from 'class-validator';
export class AddPlaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  location: string[];

  @IsNotEmpty()
  @IsString()
  image: string;

  moreImages: string[];
  user: string;

  description: string;
}
