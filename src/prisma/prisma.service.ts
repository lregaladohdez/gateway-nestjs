import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    super({
      datasources: { db: { url: configService.get<string>('DATABASE_URL') } },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

// @Injectable()
// export class PrismaHealthIndicator extends HealthIndicator {
//   constructor(private prima: PrismaClient) {
//     super();
//   }

//   async isHealthy(key: string): Promise<HealthIndicatorResult> {
//     try {
//       const result = this.prima.$queryRawUnsafe('SELECT 1;');
//       return this.getStatus(key, true, { result });
//     } catch (error) {
//       throw new HealthCheckError('Prisma check failed', error);
//     }
//   }
// }
