import { ApiProperty } from '@nestjs/swagger';
import { FindResponseDto } from '../../common/dtos/find-response.dto';
import { GatewayEntity } from '../entities/gateway.entity';

export class FindGatewayResponseDto extends FindResponseDto {
  @ApiProperty({ type: [GatewayEntity] })
  data: GatewayEntity[];
}
