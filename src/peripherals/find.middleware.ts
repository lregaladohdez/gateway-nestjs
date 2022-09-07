import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FindMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaClient) {}
  async use(req: any, res: any, next: () => void) {
    const id = req?.params?.[0] as string;
    const peripheral = await this.prisma.peripheral.findUniqueOrThrow({
      where: { id },
    });
    if (!peripheral.claimedBy) {
      throw new NotFoundException('Peripheral no longer active');
    }
    next();
  }
}
