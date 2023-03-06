import { ReplayCommentDto } from './../data/dtos/ReplayCommentDto';
import { AddCommentDto } from "../data/dtos/AddCommentDto";
import { UpdateCommentDto } from "../data/dtos/UpdateCommentDto";
import { AddLikeDto } from 'src/feature/likes/data/dtos/AddLikeDto';

export interface Comment{
    comment(data:AddCommentDto)
    updateComment(id,data:UpdateCommentDto)
    likeComment(id,data:AddLikeDto)
    replay(id,data:ReplayCommentDto)
}