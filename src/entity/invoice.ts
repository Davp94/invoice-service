import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer';
import { Product } from './product';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  inv_id: number;

  @Column()
  inv_date: string;

  @Column()
  inv_nro: string;

  //   @ManyToMany(() => Product, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  //   @JoinTable({
  //     name: 'invoice_product',
  //     joinColumn: { name: 'inv_id', referencedColumnName: 'inv_id' },
  //     inverseJoinColumn: { name: 'pro_id', referencedColumnName: 'pro_id' },
  //   })
  //   product: Product[];

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'cus_id', referencedColumnName: 'customer' })
  customer: Customer;
}
