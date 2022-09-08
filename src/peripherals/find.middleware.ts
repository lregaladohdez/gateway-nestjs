import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FindMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const id = +req?.params?.[0];
    const peripheral = await this.prisma.peripheral.findUniqueOrThrow({
      where: { id },
    });
    if (!peripheral.claimedBy) {
      throw new NotFoundException('Peripheral no longer active');
    }
    next();
  }
}
