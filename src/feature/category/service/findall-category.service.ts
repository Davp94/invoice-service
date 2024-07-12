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
    const categories: Category[] = await this.categoryRepository.find();
    const categoriesListDto: CategoryDto[] = [];
    return categoriesListDto;
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    const category: Category = await this.categoryRepository.findOne({
      where: { cat_id: id },
    });
    const categoryDto: CategoryDto = { id: 1, name: '', description: '' };
    return categoryDto;
  }
}
