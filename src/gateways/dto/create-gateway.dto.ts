import { PickType } from '@nestjs/mapped-types';
import { GatewayEntity } from '../entities/gateway.entity';

export class CreateGatewayDto extends PickType(GatewayEntity, [
  'name',
  'serial',
  'ipv4',
]) {}
