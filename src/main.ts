import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/all-exception.filter.ts.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Gateways Api Documentation')
    .setDescription('Documentation for Gateway Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('/api-doc', app, document);

  //prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, stopAtFirstError: true }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
