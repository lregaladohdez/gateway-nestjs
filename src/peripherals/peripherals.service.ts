import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Peripheral, Prisma } from '@prisma/client';
import { UUID } from 'bson';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeripheralDto } from './dto/create-peripheral.dto';
import { FindPeripheralDto } from './dto/find-perihperal.dto';
import { FindPeripheralResponseDto } from './dto/find-response.dto';
import { UpdatePeripheralDto } from './dto/update-peripheral.dto';
import { PeripheralEntity } from './entities/peripheral.entity';

function checkBeforeReturn(peripheral: Peripheral) {
  if (peripheral.claimedBy === null) {
    throw new NotFoundException('Peripheral Not Found');
  }
  return peripheral;
}

const MAX_TRIES_BEFORE_ERROR = 3;

@Injectable()
export class PeripheralsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPeripheralDto: CreatePeripheralDto,
    maxTries = 0,
  ): Promise<PeripheralEntity> {
    const targetPeripheral = this.prisma.peripheral.findFirstOrThrow({
      where: {
        claimedBy: null,
      },
    });
    if (maxTries > MAX_TRIES_BEFORE_ERROR) {
      throw new RequestTimeoutException();
    }
    const claimedBy = new UUID().toString();
    const updatedPeripheral = await this.prisma.peripheral.update({
      where: { id: (await targetPeripheral).id },
      data: { ...createPeripheralDto, claimedBy: claimedBy },
    });
    if (updatedPeripheral.claimedBy === claimedBy) {
      return updatedPeripheral;
    }
    return this.create(createPeripheralDto, maxTries + 1);
  }
  async findAll(
    filters: FindPeripheralDto,
  ): Promise<FindPeripheralResponseDto> {
    const match: Prisma.PeripheralFindManyArgs = {
      where: {},
      orderBy: { [filters.orderBy || 'date']: filters.order || 'asc' },
      take: filters.take || 10,
      skip: filters.skip || 0,
    };
    if (filters.gatewayId) {
      match.where.gatewayId = filters.gatewayId;
    }
    if (filters.search) {
      match.where.OR = ['vendor', 'uuid', 'status'].map((prop) => ({
        [prop]: {
          contains: filters.search,
          mode: Prisma.QueryMode.insensitive,
        },
      }));
    }
    return {
      data: await this.prisma.peripheral.findMany(match),
      skip: filters.skip || 0,
      take: filters.take || 10,
      total: await this.prisma.peripheral.count({ where: match.where }),
    };
  }

  findOne(id: string): Promise<PeripheralEntity> {
    return this.prisma.peripheral.findFirstOrThrow({
      where: { id, claimedBy: { not: null } },
    });
  }

  async update(
    id: string,
    updatePeripheralDto: UpdatePeripheralDto,
  ): Promise<PeripheralEntity> {
    return this.prisma.peripheral.update({
      where: { id },
      data: {
        ...updatePeripheralDto,
        date: new Date().toISOString(),
        claimedBy: new UUID().toString(),
      },
    });
  }

  async remove(id: string): Promise<PeripheralEntity> {
    return this.prisma.peripheral.update({
      where: { id },
      data: {
        claimedBy: null,
      },
    });
  }
}
