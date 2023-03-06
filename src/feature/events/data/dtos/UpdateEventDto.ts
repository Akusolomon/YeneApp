import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  privacy: boolean;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  venue: string;

  @IsOptional()
  fee: number;

  @IsOptional()
  @IsString()
  profile: string;

  @IsOptional()
  location:number[]
}
