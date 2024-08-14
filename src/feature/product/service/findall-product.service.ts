import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  In,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { Product } from 'src/entity/product';
import { PaginationSortingDto } from 'src/common/dto/pagination-sorting.dto';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class FindallProductService {
  constructor() {}

  async getAllProducts(manager: EntityManager): Promise<Product[]> {
    const products: Product[] = await manager.find(Product, {
      relations: { category: true },
      select: {
        pro_id: true,
        pro_stock: true,
        category: {
          cat_id: true,
          cat_name: true,
        },
      },
    });
    return products;
  }


  async getAllProductsPagination(manager: EntityManager, paginationSortingDto: PaginationSortingDto): Promise<ProductDto[]> {
    const products: Product[] = await manager.find(Product, {
      relations: { category: true },
      order: { [paginationSortingDto.sortParam]: paginationSortingDto.sortDirection },
      take: Number(paginationSortingDto.take),
      skip: paginationSortingDto.take * paginationSortingDto.page,
    });
    // take: 10 -- page: 0      0-10
    // take: 10 -- page: 1      11-20
    return products;
  }
}
