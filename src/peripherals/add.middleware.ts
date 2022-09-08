import { Injectable, NestMiddleware } from '@nestjs/common';
import { UUID } from 'bson';
import { PrismaService } from '../prisma/prisma.service';
import { PeriperalStatus } from './entities/peripheralStatus';

@Injectable()
export class AddMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const gatewayId = +req?.body?.gatewayId;
    const gateway = await this.prisma.gateway.findUniqueOrThrow({
      where: { id: gatewayId },
    });
    console.log('Finded Gateway', gateway);
    if (gateway.generatedPeripherals >= gateway.maxPeripherals) {
      next();
    }
    const [newPeripheral, updatedGateway] = await this.prisma.$transaction([
      this.prisma.peripheral.create({
        data: {
          claimedBy: new UUID().toString(),
          date: new Date().toISOString(),
          gatewayId: gatewayId,
          status: PeriperalStatus.offline,
          uuid: new UUID().toString(),
          vendor: 'no vendor declared',
        },
      }),
      this.prisma.gateway.update({
        where: { id: gatewayId },
        data: {
          generatedPeripherals: { increment: 1 },
        },
      }),
    ]);

    //Check if still room available after update for new peripherals
    if (updatedGateway.generatedPeripherals < updatedGateway.maxPeripherals) {
      console.log('Added new periperal');
      await this.prisma.peripheral.update({
        where: { id: newPeripheral.id },
        data: { claimedBy: null },
      });
      //Delete extra peripheral created
    } else {
      this.prisma.peripheral.delete({ where: { id: newPeripheral.id } });
    }
    next();
  }
}
