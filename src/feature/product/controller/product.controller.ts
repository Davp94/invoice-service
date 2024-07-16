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
import { Product } from 'src/entity/product';
import { DataSource } from 'typeorm';
import { FindallProductService } from '../service/findall-product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly datasource: DataSource,
    private readonly findallProductService: FindallProductService,
  ) {}

  @Get()
  async findALLCategories(): Promise<Product[]> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const result: Product[] = await this.findallProductService.getAllProducts(
        queryRunner.manager,
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
