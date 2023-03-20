import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ChatDto {
  from: string;
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  conversation_id: string;

  seen: boolean;
}
