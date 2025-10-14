import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_CONFIG.GLOBAL_PREFIX);
  await app.listen(API_CONFIG.PORT);
}
void bootstrap();
