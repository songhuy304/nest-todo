import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'mysql',
  host: `${process.env.MYSQLHOST}`,
  port: `${process.env.MYSQLPORT}`,
  username: `${process.env.MYSQLUSER}`,
  password: `${process.env.MYSQLPASSWORD}`,
  database: `${process.env.MYSQLDATABASE}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export const typeorm = registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
