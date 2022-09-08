import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { FindDto } from '../../common/dtos/find.dto';

export class FindPeripheralDto extends FindDto {
  @IsIn(['id', 'date', 'uuid', 'vendor', 'gatewayId', 'status'])
  @IsOptional()
  orderBy?: string;
  @ApiProperty()
  @IsOptional()
  gatewayId: number;
}
