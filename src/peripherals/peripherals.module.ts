import { Module } from '@nestjs/common';
import { PeripheralsService } from './peripherals.service';
import { PeripheralsController } from './peripherals.controller';

@Module({
  controllers: [PeripheralsController],
  providers: [PeripheralsService],
})
export class PeripheralsModule {}
