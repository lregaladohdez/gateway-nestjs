import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FindGatewayResponseDto } from '../src/gateways/dto/find-response-gateway.dto';
import { UUID } from 'bson';

describe('Gateway (e2e)', () => {
  let app: INestApplication;
  const sample = {
    id: 1,
    serial: new UUID().toString(),
    name: 'hello@prisma.io',
    ipv4: '127.0.0.1',
    maxPeripherals: 10,
    generatedPeripherals: 10,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/gateways (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/gateways');
    expect(result.statusCode).toBe(200);
    expect(result.body.take).toBeGreaterThanOrEqual(0);
    expect(result.body.skip).toBeGreaterThanOrEqual(0);
    expect(result.body.total).toBeGreaterThanOrEqual(0);
    expect(result.body.data).toBeDefined();
  });
  it('/gateways (POST) && (PATCH) && (Delete)', async () => {
    const result = await request(app.getHttpServer()).post('/gateways').send({
      name: sample.name,
      serial: sample.serial,
      ipv4: sample.ipv4,
    });
    expect(result.statusCode).toBe(201);
    expect(result.body.id).toBeDefined();
    expect(result.body.name).toBe(sample.name);
    const newNAme = new UUID().toString();
    const resultEdit = await request(app.getHttpServer())
      .patch(`/gateways/${result.body.id}`)
      .send({
        name: newNAme,
      });
    expect(resultEdit.statusCode).toBe(200);
    expect(resultEdit.body.name).toBe(newNAme);
    const resultDelete = await request(app.getHttpServer()).delete(
      `/gateways/${result.body.id}`,
    );
    expect(resultDelete.statusCode).toBe(200);
    expect(resultDelete.body.name).toBe(newNAme);
  });
});
