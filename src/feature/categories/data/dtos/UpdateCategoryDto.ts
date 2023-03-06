import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  icon: string;
}
