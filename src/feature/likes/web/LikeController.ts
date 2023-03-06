import { UserRoles } from './../../../util/API/UserRoles';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikeService } from '../domain/LikeService';
import { AddLikeDto } from '../data/dtos/AddLikeDto';
import { Role } from 'src/util/decorators/Role';

@Controller('like')
export class LikeController {
    private service:LikeService

    constructor(){
        this.service = new LikeService()
        this.service = DatabaseFactory.getRepository('like')

    }
    @Post(':id/add')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Role([UserRoles.USER])
    like(@Body() data: AddLikeDto,@Param('id') id:string) {
        data.likedOn = id
        return this.service.like(data)
    }
   
    @Post(':id/unlike')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Role([UserRoles.USER])
    unLike(@Param('id') id: any,) {
        return this.service.unLike(id)
    }
  
}
