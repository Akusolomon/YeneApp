import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export class AddCommentDto{
    @IsNotEmpty()
    @IsString()
    body:string

    user:string
    commentedOn:string

    @IsNotEmpty()
    @IsIn(["Event","Moment"])
    onModel:string

}