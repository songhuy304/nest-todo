import { registerAs } from '@nestjs/config';

export const apiConfig = registerAs('api', () => ({
  GLOBAL_PREFIX: process.env.GLOBAL_PREFIX || 'gw/api/v1',
  PORT: Number(process.env.PORT) || 3000,
}));
