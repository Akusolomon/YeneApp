import { IsNotEmpty, IsString } from "class-validator";

export class changeUserPassword{
    @IsNotEmpty()
    @IsString()
    newPassword:string
}