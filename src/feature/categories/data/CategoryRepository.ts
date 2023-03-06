/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CategoryEntity } from './model/CategoryEntity';
import { Category } from '../domain/Category';
import { AddCategoryDto } from './dtos/AddCategoryDto';
import { UpdateCategoryDto } from './dtos/UpdateCategoryDto';

export class CategoryRepository implements Category {
  async addCategory(data: AddCategoryDto) {
    await CategoryEntity.create(data)
  }
  async updateCategory(id,data: UpdateCategoryDto) {
    await CategoryEntity.findByIdAndUpdate(id,data)
  }
  async getCategories() {
    const cate = await CategoryEntity.find()
    return cate
  }
  async getCategoryById(id: any) {
    const cate = await CategoryEntity.findById(id)
    return cate
  }
  async deleteCategory(id: any) {
    await CategoryEntity.findByIdAndDelete(id)
  }
}
