import { PickType } from '@nestjs/swagger';
import { PeripheralEntity } from '../entities/peripheral.entity';

export class CreatePeripheralDto extends PickType(PeripheralEntity, [
  'gatewayId',
  'status',
  'uuid',
  'vendor',
]) {}
