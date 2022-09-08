import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FindGatewayResponseDto } from '../src/gateways/dto/find-response-gateway.dto';
import { UUID } from 'bson';

describe('Peripheral (e2e)', () => {
  let app: INestApplication;
  let sampleGateway = {
    id: 1,
    serial: new UUID().toString(),
    name: 'hello@prisma.io',
    ipv4: '127.0.0.1',
    maxPeripherals: 10,
    generatedPeripherals: 10,
  };
  const samplePeripheral = {
    id: 1,
    uuid: new UUID().toString(),
    vendor: new UUID().toString(),
    status: 'online',
    gatewayId: 1,
    claimedBy: null,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const result = await request(app.getHttpServer()).post('/gateways').send({
      name: 'hello@prisma.io',
      serial: new UUID().toString(),
      ipv4: '127.0.0.1',
    });
    sampleGateway = result.body;
  });

  it('/peripherals (GET)', async () => {
    const result = await request(app.getHttpServer()).get(
      `/peripherals?gatewayId=${sampleGateway.id}`,
    );
    expect(result.statusCode).toBe(200);
    expect(result.body.take).toBeGreaterThanOrEqual(0);
    expect(result.body.skip).toBeGreaterThanOrEqual(0);
    expect(result.body.total).toBeGreaterThanOrEqual(0);
    expect(result.body.data).toBeDefined();
  });
  it('/peripherals (POST) && (PATCH) && (Delete)', async () => {
    const result = await request(app.getHttpServer())
      .post('/peripherals')
      .send({
        uuid: samplePeripheral.uuid,
        vendor: samplePeripheral.vendor,
        status: samplePeripheral.status,
        gatewayId: sampleGateway.id,
      });
    expect(result.statusCode).toBe(201);
    expect(result.body.id).toBeDefined();
    expect(result.body.uuid).toBe(samplePeripheral.uuid);
    const uuid = new UUID().toString();
    const resultEdit = await request(app.getHttpServer())
      .patch(`/peripherals/${result.body.id}`)
      .send({
        uuid,
      });
    expect(resultEdit.statusCode).toBe(200);
    expect(resultEdit.body.uuid).toBe(uuid);
    const resultDelete = await request(app.getHttpServer()).delete(
      `/peripherals/${result.body.id}`,
    );
    expect(resultDelete.statusCode).toBe(200);
    expect(resultDelete.body.uuid === uuid).toBe(false);
  });
});
