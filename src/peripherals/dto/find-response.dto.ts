import { ApiProperty } from '@nestjs/swagger';
import { FindResponseDto } from '../../common/dtos/find-response.dto';
import { PeripheralEntity } from '../entities/peripheral.entity';

export class FindPeripheralResponseDto extends FindResponseDto {
  @ApiProperty({ type: [PeripheralEntity] })
  data: PeripheralEntity[];
}
