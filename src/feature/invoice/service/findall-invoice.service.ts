import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { Product } from 'src/entity/product';
import { Invoice } from 'src/entity/invoice';

@Injectable()
export class FindallInvoiceService {
  manager: EntityManager;
  constructor(private readonly datasource: DataSource) {
    this.manager = datasource.manager;
  }

  async getAllInvoice(): Promise<Invoice[]> {
    const invoices: Invoice[] = await this.manager.query(
      'select * from invoice',
    );
    return invoices;
  }

  async getAllInvoiceById(id: number): Promise<Invoice> {
    const invoice: Invoice = await this.manager.query(
      `select * 
       from invoice 
       where true
       ${id ? `AND inv_id = ${id}` : ''}; `,
    );
    return invoice;
  }

  async getAllInvoiceByIdQueryBuilder(id: number): Promise<Invoice> {
    const invoice: Invoice = await this.datasource
      .getRepository(Invoice)
      .createQueryBuilder('invoice')
      .where(`inv_id = :id`, { id: id })
      .getOne();
    return invoice;
  }
}
