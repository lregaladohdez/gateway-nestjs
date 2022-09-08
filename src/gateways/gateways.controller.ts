import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GatewayEntity } from './entities/gateway.entity';
import { FindGatewayResponseDto } from './dto/find-response-gateway.dto';
import { FindGatewayDto } from './dto/find-gateway.dto';

@Controller('gateways')
@ApiTags('Gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Post()
  @ApiResponse({ type: GatewayEntity })
  create(@Body() createGatewayDto: CreateGatewayDto) {
    return this.gatewaysService.create(createGatewayDto);
  }

  @Get()
  @ApiResponse({ type: FindGatewayResponseDto })
  findAll(
    @Query() filters: FindGatewayDto,
    @Query('peripherals')
    peripherals = false,
  ) {
    return this.gatewaysService.findAll(filters, peripherals);
  }

  @Get(':id')
  @ApiResponse({ type: GatewayEntity })
  findOne(@Param('id') id: string, @Query('peripherals') peripherals: boolean) {
    return this.gatewaysService.findOne(+id, peripherals);
  }

  @Patch(':id')
  @ApiResponse({ type: GatewayEntity })
  update(
    @Param('id') id: string,
    @Body() updateGatewayDto: UpdateGatewayDto,
    @Query('peripherals') peripherals: boolean,
  ) {
    return this.gatewaysService.update(+id, updateGatewayDto, peripherals);
  }

  @Delete(':id')
  @ApiResponse({ type: GatewayEntity })
  remove(@Param('id') id: string) {
    return this.gatewaysService.remove(+id);
  }
}
