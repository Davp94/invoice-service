import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CreateCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<CategoryDto> {
    const categoryToCreated = new Category();
    categoryToCreated.cat_name = category.name;
    categoryToCreated.cat_description = category.description;
    const categoryCreated: Category = await this.categoryRepository.save(categoryToCreated);
    const categoryDto: CategoryDto = {
      id: categoryCreated.cat_id,
      name: categoryCreated.cat_name,
      description: categoryCreated.cat_description,
    };
    return categoryDto;
  }
}
