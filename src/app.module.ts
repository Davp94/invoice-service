import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './feature/customer/customer.module';
import { InvoiceModule } from './feature/invoice/invoice.module';
import { CategoryModule } from './feature/category/category.module';
import { ProductModule } from './feature/product/product.module';
import { InvoiceProductModule } from './feature/invoice_product/invoice_product.module';

@Module({
  imports: [
    CustomerModule,
    InvoiceModule,
    CategoryModule,
    ProductModule,
    InvoiceProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
