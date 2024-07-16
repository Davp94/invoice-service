import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  In,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { Category } from 'src/entity/category';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product';

@Injectable()
export class FindallProductService {
  manager: EntityManager;
  constructor(private readonly datasource: DataSource) {
    this.manager = datasource.manager;
  }

  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.manager.find(Product, {
      relations: { category: true },
      select: {
        pro_id: true,
        pro_stock: true,
        category: {
          cat_id: true,
          cat_name: true,
        },
      },
      where: {
        pro_price: In([10, 100]),
      },
    });
    return products;
  }
}
