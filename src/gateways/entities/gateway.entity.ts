import { ApiProperty } from '@nestjs/swagger';
import { Gateway } from '@prisma/client';
import { isIPv4 } from 'net';
import { IsIpv4 } from '../../common/validators/is-ip-v4.decorator';

export class GatewayEntity implements Gateway {
  @ApiProperty()
  id: string;
  @ApiProperty()
  serial: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ example: '127.0.0.1' })
  @IsIpv4()
  ipv4: string;
  maxPeripherals: number;
  generatedPeripherals: number;
}
