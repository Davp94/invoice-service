import { Global, Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';

import { FindallCategoryService } from './service/findall-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { CreateCategoryService } from './service/create-category.service';
import { UpdateCategoryService } from './service/update-category.service';
import { DeleteCategoryService } from './service/delete-category.service';

@Global()
@Module({
  providers: [FindallCategoryService, CreateCategoryService, UpdateCategoryService, DeleteCategoryService],
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [FindallCategoryService, CreateCategoryService, UpdateCategoryService, DeleteCategoryService],
})
export class CategoryModule {}
