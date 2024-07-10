import { Module } from '@nestjs/common';
import { CategoryController } from './component/category.controller';

@Module({
  providers: [],
  controllers: [CategoryController],
  imports: [],
  exports: [],
})
export class CategoryModule {}
