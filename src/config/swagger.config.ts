import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Dev station')
  .setDescription('Dev station')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swaggerOptions = {
  customSiteTitle: 'Your API Documentation',
  useGlobalPrefix: false,
};
