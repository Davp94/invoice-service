import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FindallCategoryService } from '../service/findall-category.service';
import { CreateCategoryService } from '../service/create-category.service';
import { DeleteCategoryService } from '../service/delete-category.service';
import { UpdateCategoryService } from '../service/update-category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly findAllCategoriService: FindallCategoryService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
    private readonly updateCategoryService: UpdateCategoryService
  ) {}

  @Get()
  async findALLCategories(): Promise<CategoryDto[]> {
    const response = await this.findAllCategoriService.getAllCategories();
    return response;
  }

  //Use @Query when you want to filter data
  //nombre=ASC, descripcion: desc, page: 0, take: 10, order: ASC
  @Get('query')
  findCategoryFiltering(@Req() req, @Query() categoryDto: CategoryDto): string {
    console.log(req);
    return `find category with data ${JSON.stringify(categoryDto)}`;
  }

  //Use @Param when you want to get or do an operacion over an specific object
  @Get(':id')
  async findCategoryById(@Param('id') id: number): Promise<CategoryDto> {
    return await this.findAllCategoriService.getCategoryById(id);
  }

  @Post()
  async saveCategory(@Req() req, @Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return await this.createCategoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  async updateCategory(@Req() req, @Body() createCategoryDto: CreateCategoryDto, @Param('id') categoryId: number): Promise<number> {
    const result = await this.updateCategoryService.updateCategory(createCategoryDto, categoryId);
    return result;
  }

  @Delete(':id')
  async deleteCategory(@Req() req, @Param('id') categoryId: number): Promise<void> {
    await this.deleteCategoryService.delete(categoryId);
  }
}
