import { IsNotEmpty, IsString } from "class-validator"

export class ReplayCommentDto{
    user:string
    @IsNotEmpty()
    @IsString()
    body:string
}