import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralsController } from './peripherals.controller';
import { PeripheralsService } from './peripherals.service';

describe('PeripheralsController', () => {
  let controller: PeripheralsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeripheralsController],
      providers: [PeripheralsService],
    }).compile();

    controller = module.get<PeripheralsController>(PeripheralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
