import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { FindDto } from '../../common/dtos/find.dto';

export class FindPeripheralDto extends FindDto {
  @IsIn(['id', 'date', 'uuid', 'vendor', 'gatewayId', 'status'])
  orderBy?: string;
  @ApiProperty()
  gatewayId: number;
}
