import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { getRootPath } from 'src/utilities/path-utils';
import { DataSourceOptions } from 'typeorm';
config();
export default registerAs(
  'database',
  (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [getRootPath('src', '**', '*.entity{.ts,.js}')],
    synchronize: false,
    migrationsTableName: 'migrations',
    migrations: [getRootPath('db', 'migrations', '*{.ts,.js}')],
  }),
);
