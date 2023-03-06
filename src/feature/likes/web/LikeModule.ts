import { LikeService } from './../domain/LikeService';
import { LikeController } from './LikeController';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
