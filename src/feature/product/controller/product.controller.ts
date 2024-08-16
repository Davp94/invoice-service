import { Body, Controller, Get, Header, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Product } from 'src/entity/product';
import { DataSource } from 'typeorm';
import { FindallProductService } from '../service/findall-product.service';
import { ProductDto } from '../dto/product.dto';
import { PaginationSortingDto } from 'src/common/dto/pagination-sorting.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname;
          callback(null, `${originalName.split('.')[0]}-${uniqueSuffix}${extname(originalName)}`);
        },
      }),
    })
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file detected');
    }
    return { file: file.filename };
  }
}
