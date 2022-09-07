import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class FindDto {
  @ApiProperty({ required: false })
  @IsOptional()
  // @MaxLength(50)
  search?: string;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Max(300)
  @IsInt()
  take?: number = 10;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(300)
  skip?: number = 0;

  @ApiProperty({ required: false, default: 'asc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string = 'asc';

  @ApiProperty()
  @IsOptional()
  @MaxLength(50)
  orderBy?: string;
}
