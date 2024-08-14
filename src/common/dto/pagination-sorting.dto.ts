import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../constant/order.enum';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

export class PaginationSortingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(2)
  public take: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  public page: number;

  @ApiProperty()
  @IsEnum(Order)
  @IsNotEmpty()
  public sortDirection: Order;

  @ApiProperty()
  @IsNotEmpty()
  public sortParam: string;
}
