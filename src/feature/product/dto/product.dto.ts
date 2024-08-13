import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Matches } from 'class-validator';

export class ProductDto {

  @ApiProperty()
  @IsInt()
  pro_stock: string;

  @IsInt()
  pro_price: number;

  //validation to regular expressions
  @Matches(/[a-zA-Z]+/g)
  pro_name: string;
}
