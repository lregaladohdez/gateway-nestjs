import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PeripheralsService } from './peripherals.service';
import { PeripheralsController } from './peripherals.controller';
import { FindMiddleware } from './find.middleware';
import { AddMiddleware } from './add.middleware';

@Module({
  controllers: [PeripheralsController],
  providers: [PeripheralsService],
  imports: [],
})
export class PeripheralsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FindMiddleware)
      .forRoutes(
        { path: 'peripherals/*', method: RequestMethod.PATCH },
        { path: 'peripherals/*', method: RequestMethod.DELETE },
      )
      .apply(AddMiddleware)
      .forRoutes(
        { path: 'peripherals', method: RequestMethod.POST },
        { path: 'peripherals/*', method: RequestMethod.PATCH },
      );
  }
}
