import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The name could not be empty' })
  @IsString({ message: 'The name must to be a string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
