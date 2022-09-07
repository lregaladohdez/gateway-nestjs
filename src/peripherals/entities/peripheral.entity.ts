import { ApiProperty } from '@nestjs/swagger';
import { Peripheral } from '@prisma/client';
import { IsDateString, IsIn, IsUUID } from 'class-validator';

export class PeripheralEntity implements Peripheral {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsUUID()
  uuid: string;
  @ApiProperty()
  vendor: string;
  @ApiProperty()
  @IsDateString()
  date: Date;
  @ApiProperty()
  @IsIn(['offline', 'online'])
  status: string;
  @ApiProperty()
  gatewayId: string;
  claimedBy: string;
}
