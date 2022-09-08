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

  const sample = {
    id: 1,
    serial: 'Rich Haines',
    name: 'hello@prisma.io',
    ipv4: '127.0.0.1',
    maxPeripherals: 20,
    generatedPeripherals: 10,
  };

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
  it('should create gateway', async () => {
    mockCtx.prisma.gateway.create.mockResolvedValue(sample);
    const result = await service.create(sample);
    expect(result.id).toBe(sample.id);
  });
  it('should update a gateway', async () => {
    mockCtx.prisma.gateway.update.mockResolvedValue(sample);
    const result = await service.update(sample.id, { name: sample.name });
    expect(result).toBe(sample);
  });
  it('should find a gateway', async () => {
    mockCtx.prisma.gateway.findMany.mockResolvedValue([sample]);
    mockCtx.prisma.gateway.count.mockResolvedValue(1);

    const take = 3;
    const skip = 2;
    const result = await service.findAll({ take, skip });
    expect(result.data).toStrictEqual([sample]);
    expect(result.take).toBe(take);
    expect(result.skip).toBe(skip);
    expect(result.total).toBe(1);
  });
  it('should delete a gateway', async () => {
    mockCtx.prisma.gateway.delete.mockResolvedValue(sample);
    const result = await service.remove(sample.id);
    expect(result).toBe(sample);
  });
});
