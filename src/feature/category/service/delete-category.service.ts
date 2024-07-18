import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async delete(categoryId: number): Promise<void> {
    await this.categoryRepository.delete(categoryId);
  }
}
