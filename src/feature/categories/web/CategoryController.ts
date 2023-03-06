import { UpdateCategoryDto } from './../data/dtos/UpdateCategoryDto';
import { UserRoles } from './../../../util/API/UserRoles';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AddCategoryDto } from './../data/dtos/AddCategoryDto';
import { DatabaseFactory } from './../../../database/DatabaseFactory';
import { CategoryService } from './../domain/CategoryService';
import { Category } from './../domain/Category';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from 'src/util/decorators/Role';

@Controller('category')
export class CategoryController implements Category {
  private service: CategoryService;
  constructor() {
    this.service = new CategoryService();
    this.service = DatabaseFactory.getRepository('category');
  }
  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.ADMIN])
  addCategory(@Body() data: AddCategoryDto) {
    return this.service.addCategory(data);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.ADMIN])
  updateCategory(@Param('id') id, data: UpdateCategoryDto) {
    return this.service.updateCategory(id, data);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.ADMIN,UserRoles.USER])
  getCategories() {
    return this.service.getCategories();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.ADMIN,UserRoles.USER])
  getCategoryById(@Param('id') id: any) {
    return this.service.getCategoryById(id);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Role([UserRoles.ADMIN])
  deleteCategory(@Param('id') id: any) {
    return this.service.deleteCategory(id);
  }
}
