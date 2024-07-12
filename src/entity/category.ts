import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  cat_id: number;

  @Column()
  cat_name: string;

  @Column()
  cat_description: string;

  @OneToMany(() => Product, (product) => product.pro_id)
  products: Product[];
}
