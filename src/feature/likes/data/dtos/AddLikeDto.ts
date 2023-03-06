import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export class AddLikeDto{
   
    user:string
    likedOn:string

    @IsNotEmpty()
    @IsIn(["Event","Moment"])
    onModel:string

}