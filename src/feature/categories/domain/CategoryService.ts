import { Category } from './Category';
import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from '../data/dtos/AddCategoryDto';
import { UpdateCategoryDto } from '../data/dtos/UpdateCategoryDto';

@Injectable()
export class CategoryService implements Category {
  addCategory(data: AddCategoryDto) {
    throw new Error('Method not implemented.');//TODO
  }
  updateCategory(id,data: UpdateCategoryDto) {
    throw new Error('Method not implemented.');
  }
  getCategories() {
    throw new Error('Method not implemented.');
  }
  getCategoryById(id: any) {
    throw new Error('Method not implemented.');
  }
  deleteCategory(id: any) {
    throw new Error('Method not implemented.');
  }
}
