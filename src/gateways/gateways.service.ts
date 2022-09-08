import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { FindGatewayDto } from './dto/find-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { GatewayEntity } from './entities/gateway.entity';
import { FindGatewayResponseDto } from './dto/find-response-gateway.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const MAX_PERIPHERALS = 10;

@Injectable()
export class GatewaysService {
  constructor(private prisma: PrismaService) {}

  create(createGatewayDto: CreateGatewayDto): Promise<GatewayEntity> {
    return this.prisma.gateway.create({
      data: { ...createGatewayDto },
    });
  }

  async findAll(
    filters: FindGatewayDto,
    peripherals = false,
  ): Promise<FindGatewayResponseDto> {
    const match: Prisma.GatewayFindManyArgs = { where: {} };
    match.where;
    if (filters.search) {
      match.where = {
        OR: ['serial', 'ipv4', 'name'].map((p) => ({
          [p]: {
            contains: filters.search,
          },
        })),
      };
    }
    return {
      data: await this.prisma.gateway.findMany({
        where: match.where,
        include: { peripherals },
      }),
      total: await this.prisma.gateway.count({ where: match.where }),
      skip: filters.skip || 0,
      take: filters.take || 10,
    };
  }

  findOne(id: number, peripherals = false): Promise<GatewayEntity | null> {
    return this.prisma.gateway.findUnique({
      where: { id },
      include: { peripherals },
    });
  }

  update(
    id: number,
    updateGatewayDto: UpdateGatewayDto,
    peripherals = false,
  ): Promise<GatewayEntity> {
    return this.prisma.gateway.update({
      where: { id },
      data: updateGatewayDto,
      include: { peripherals },
    });
  }

  remove(id: number): Promise<GatewayEntity> {
    return this.prisma.gateway.delete({ where: { id } });
  }
}
