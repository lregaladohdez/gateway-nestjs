import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreatePeripheralDto } from './create-peripheral.dto';

export class UpdatePeripheralDto extends PartialType(CreatePeripheralDto) {
  @Exclude()
  gatewayId?: number;
}
