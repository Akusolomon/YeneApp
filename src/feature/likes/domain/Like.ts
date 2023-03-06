import { AddLikeDto } from './../data/dtos/AddLikeDto';


export interface Like{
    like(data:AddLikeDto)
    unLike(id)
}