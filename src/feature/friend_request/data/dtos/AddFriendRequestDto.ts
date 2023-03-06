import { IsNotEmpty, IsString } from 'class-validator';

export class AddFriendRequest {
  sender: string;

  @IsNotEmpty()
  @IsString()
  receiver: string;
}
