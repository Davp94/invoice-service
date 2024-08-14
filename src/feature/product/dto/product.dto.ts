import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Matches } from 'class-validator';
import { Category } from 'src/entity/category';

export class ProductDto {
  @ApiProperty()
  @IsInt()
  pro_id: number;

  @ApiProperty()
  @IsInt()
  pro_stock: number;

  @ApiProperty()
  @IsString()
  pro_name: string;

  @ApiProperty()
  @IsInt()
  pro_price: number;

  category: Category;

  //validation to regular expressions
  // @Matches(/[a-zA-Z]+/g)
  // pro_name: string;
}
