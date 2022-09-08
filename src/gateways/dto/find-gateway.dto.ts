import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { FindDto } from '../../common/dtos/find.dto';

export class FindGatewayDto extends FindDto {
  @ApiProperty()
  @IsOptional()
  @IsIn(['id', 'serial', 'name', 'ipv4'])
  orderBy?: string = 'serial';
}
