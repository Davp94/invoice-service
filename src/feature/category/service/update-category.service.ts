import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async updateCategory(
    category: CreateCategoryDto,
    id: number,
  ): Promise<number> {
    // const categoryToUpdate = await this.categoryRepository.findOne({
    //   where: { cat_id: id },
    // });
    const categoryToUpdate = new Category();
    categoryToUpdate.cat_name = category.name;
    categoryToUpdate.cat_description = category.description;
    //await this.categoryRepository.save(categoryToUpdate);
    await this.categoryRepository.update(id, categoryToUpdate);
    return id;
  }
}
