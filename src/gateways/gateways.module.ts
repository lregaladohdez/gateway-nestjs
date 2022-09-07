import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';

@Module({
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
