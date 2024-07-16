import { Injectable } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/entity/category';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindallCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories: Category[] = await this.categoryRepository.find({});
    const categoriesListDto: CategoryDto[] = [];
    for (const category of categories) {
      const categoryDto: CategoryDto = {
        id: category.cat_id,
        name: category.cat_name,
        description: category.cat_description,
      };
      categoriesListDto.push(categoryDto);
    }
    return categoriesListDto;
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    const category: Category = await this.categoryRepository.findOne({
      where: { cat_id: id },
    });
    const categoryDto: CategoryDto = {
      id: category.cat_id,
      name: category.cat_name,
      description: category.cat_description,
    };
    return categoryDto;
  }
}
