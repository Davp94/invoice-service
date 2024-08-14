import { Body, Controller, Get, Header, Param, Post, Query, Req } from '@nestjs/common';
import { Product } from 'src/entity/product';
import { DataSource } from 'typeorm';
import { FindallProductService } from '../service/findall-product.service';
import { ProductDto } from '../dto/product.dto';
import { PaginationSortingDto } from 'src/common/dto/pagination-sorting.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly datasource: DataSource,
    private readonly findallProductService: FindallProductService
  ) {}

  @Get()
  async findALLproducts(): Promise<Product[]> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const result: Product[] = await this.findallProductService.getAllProducts(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  @Get('pagination')
  async findAllProductsPagination(@Query() paginationSortingDto: PaginationSortingDto): Promise<ProductDto[]> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const result: ProductDto[] = await this.findallProductService.getAllProductsPagination(queryRunner.manager, paginationSortingDto);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
