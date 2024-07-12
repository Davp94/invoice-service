import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category';
import { Invoice } from './invoice';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  pro_id: number;

  @Column()
  pro_stock: string;

  @Column()
  pro_price: string;

  //   @ManyToMany(() => Invoice)
  //   invoice: Invoice[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'cat_id', referencedColumnName: 'category' })
  category: Category;
}
