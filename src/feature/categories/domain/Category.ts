import { AddCategoryDto } from '../data/dtos/AddCategoryDto';
import { UpdateCategoryDto } from '../data/dtos/UpdateCategoryDto';

export interface Category {
  addCategory(data: AddCategoryDto);
  updateCategory(id,data: UpdateCategoryDto);
  getCategories();
  getCategoryById(id);
  deleteCategory(id);
}
