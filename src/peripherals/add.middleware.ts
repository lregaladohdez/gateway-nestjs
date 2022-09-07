import { Injectable, NestMiddleware } from '@nestjs/common';
import { UUID } from 'bson';
import e from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PeriperalStatus } from './entities/peripheralStatus';

@Injectable()
export class AddMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const gatewayId = req?.body?.gatewayId as string;
    const gateway = await this.prisma.gateway.findUniqueOrThrow({
      where: { id: gatewayId },
    });
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
    if (
      updatedGateway.generatedPeripherals < updatedGateway[1].maxPeripherals
    ) {
      await this.prisma.peripheral.update({
        where: { id: res },
        data: { claimedBy: null },
      });
      //Delete extra peripheral created
    } else {
      this.prisma.peripheral.delete({ where: { id: newPeripheral.id } });
    }
    next();
  }
}
