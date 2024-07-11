import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FindallCategoryService } from '../service/findall-category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly findAllCategoriService: FindallCategoryService,
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
  saveCategory(
    @Req() req,
    @Body() createCategoryDto: CreateCategoryDto,
  ): string {
    console.log(req);
    return `saving category with data ${JSON.stringify(createCategoryDto)}`;
  }
}
