import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './feature/customer/customer.module';
import { InvoiceModule } from './feature/invoice/invoice.module';
import { CategoryModule } from './feature/category/category.module';
import { ProductModule } from './feature/product/product.module';
import { InvoiceProductModule } from './feature/invoice_product/invoice_product.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CategoryController } from './feature/category/controller/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { entities } from './entity';

@Module({
  imports: [
    CustomerModule,
    InvoiceModule,
    CategoryModule,
    ProductModule,
    InvoiceProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'db_invoice',
      logging: true,
      entities: entities,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CategoryController);
  }

  constructor(private datasource: DataSource) {}
}
