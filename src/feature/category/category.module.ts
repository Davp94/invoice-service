import { Global, Module } from '@nestjs/common';
import { CategoryController } from './component/category.controller';
import { CreateService } from './service/create.service';
import { UpdateService } from './service/update.service';
import { DeleteService } from './service/delete.service';
import { FindallCategoryService } from './service/findall-category.service';

@Global()
@Module({
  providers: [
    FindallCategoryService,
    CreateService,
    UpdateService,
    DeleteService,
  ],
  controllers: [CategoryController],
  imports: [],
  exports: [
    FindallCategoryService,
    CreateService,
    UpdateService,
    DeleteService,
  ],
})
export class CategoryModule {}
