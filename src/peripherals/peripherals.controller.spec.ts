import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PeripheralsController } from './peripherals.controller';
import { PeripheralsService } from './peripherals.service';
import { MockContext, Context, createMockContext } from '../../context';

describe('PeripheralsController', () => {
  let controller: PeripheralsController;
  let mockCtx: MockContext;
  let ctx: Context;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeripheralsController],
      providers: [
        PeripheralsService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    controller = module.get<PeripheralsController>(PeripheralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
