import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { MockContext, Context, createMockContext } from '../../context';
import { mock } from 'jest-mock-extended';

describe('GatewaysController', () => {
  let controller: GatewaysController;
  let mockCtx: MockContext;
  let ctx: Context;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [
        GatewaysService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    controller = module.get<GatewaysController>(GatewaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
