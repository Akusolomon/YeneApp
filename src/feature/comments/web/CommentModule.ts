import { CommentService } from './../domain/CommentService';
import { CommentController } from './CommentController';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
