import { IsNotEmpty, IsString } from 'class-validator';

export class AddCategoryDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  icon: string;
}
