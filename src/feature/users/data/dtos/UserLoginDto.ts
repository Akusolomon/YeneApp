import { IsNotEmpty, IsString } from "class-validator"

export class UserLoginDto {

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    password: string
}