import { CategoryController } from './CategoryController';
import { CategoryService } from './../domain/CategoryService';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
