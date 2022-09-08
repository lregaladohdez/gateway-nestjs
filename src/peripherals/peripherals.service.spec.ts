import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralsService } from './peripherals.service';
import { MockContext, Context, createMockContext } from '../../context';
import { PrismaService } from '../prisma/prisma.service';

describe('PeripheralsService', () => {
  let service: PeripheralsService;
  let mockCtx: MockContext;
  let ctx: Context;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeripheralsService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    service = module.get<PeripheralsService>(PeripheralsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
