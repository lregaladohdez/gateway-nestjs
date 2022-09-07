import { ApiProperty } from '@nestjs/swagger';

export class FindResponseDto {
  @ApiProperty({ type: [] })
  data: any[];
  @ApiProperty({ example: 10 })
  take: number;
  @ApiProperty()
  skip: number;
  @ApiProperty({ example: 50 })
  total: number;
}
