import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cus_id: number;

  @Column()
  cus_names: string;

  @Column()
  cus_lastname: string;

  @Column()
  cus_password: string;

  @Column()
  cus_nit: string;

  @Column()
  cus_razon_social: string;

  @Column()
  email: string;
}
