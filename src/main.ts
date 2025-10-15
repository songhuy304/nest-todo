// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const globalPrefix =
    configService.get<string>('api.GLOBAL_PREFIX') ?? 'gw/api/v1';
  const port = configService.get<number>('api.PORT') ?? 3000;

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}
void bootstrap();
