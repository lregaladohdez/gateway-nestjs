import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModule } from './gateways/gateways.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GatewaysModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
