import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysService } from './gateways.service';
import { MockContext, Context, createMockContext } from '../../context';
import { PrismaService } from '../prisma/prisma.service';

let mockCtx: MockContext;
let ctx: Context;

describe('GatewaysService', () => {
  let service: GatewaysService;
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatewaysService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    service = module.get<GatewaysService>(GatewaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Shoud create gateway', async () => {
    const gateway = {
      id: 1,
      serial: 'Rich Haines',
      name: 'hello@prisma.io',
      ipv4: '127.0.0.1',
      maxPeripherals: 20,
      generatedPeripherals: 10,
    };
    mockCtx.prisma.gateway.create.mockResolvedValue(gateway);
    const result = await service.create(gateway);
    expect(result.id).toBe(gateway.id);
  });
});
