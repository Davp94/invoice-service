import { Injectable } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class FindallCategoryService {
  categoriesList: CategoryDto[];
  constructor() {
    this.categoriesList = [
      {
        id: 1,
        name: 'categoria1',
        description: 'desc categoria1',
      },
      {
        id: 2,
        name: 'categoria2',
        description: 'desc categoria2',
      },
      {
        id: 3,
        name: 'categoria3',
        description: 'desc categoria3',
      },
    ];
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    return this.categoriesList;
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    const category = this.categoriesList.find((res) => res.id == id);
    return category;
  }
}
