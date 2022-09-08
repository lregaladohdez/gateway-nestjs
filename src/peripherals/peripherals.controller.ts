import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { PeripheralsService } from './peripherals.service';
import { CreatePeripheralDto } from './dto/create-peripheral.dto';
import { UpdatePeripheralDto } from './dto/update-peripheral.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeripheralEntity } from './entities/peripheral.entity';
import { FindPeripheralResponseDto } from './dto/find-response.dto';
import { FindPeripheralDto } from './dto/find-perihperal.dto';

@Controller('peripherals')
@ApiTags('Peripherals')
export class PeripheralsController {
  constructor(private readonly peripheralsService: PeripheralsService) {}

  @Post()
  @ApiResponse({ type: PeripheralEntity })
  create(@Body() createPeripheralDto: CreatePeripheralDto) {
    return this.peripheralsService.create(createPeripheralDto);
  }

  @Get()
  @ApiResponse({ type: FindPeripheralResponseDto })
  findAll(@Param() filters: FindPeripheralDto) {
    return this.peripheralsService.findAll(filters);
  }

  @Get(':id')
  @ApiResponse({ type: PeripheralEntity })
  findOne(@Param('id') id: string) {
    return this.peripheralsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ type: PeripheralEntity })
  update(
    @Param('id') id: string,
    @Body() updatePeripheralDto: UpdatePeripheralDto,
  ) {
    return this.peripheralsService.update(+id, updatePeripheralDto);
  }

  @Delete(':id')
  @ApiResponse({ type: PeripheralEntity })
  remove(@Param('id') id: string) {
    return this.peripheralsService.remove(+id);
  }
}
