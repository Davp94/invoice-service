import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  pro_id: number;

  @Column()
  pro_name: string;

  @Column()
  pro_stock: number;

  @Column()
  pro_price: number;

  //   @ManyToMany(() => Invoice)
  //   invoice: Invoice[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'cat_id', referencedColumnName: 'cat_id' })
  category: Category;
}
