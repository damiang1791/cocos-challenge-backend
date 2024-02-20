import { DataSource } from 'typeorm';

const migrationsPath =
  process.env.NODE_ENV === 'local'
    ? 'src/core/db/migrations/*.ts'
    : 'dist/src/core/db/migrations/*.js';

const migrationsEntities =
  process.env.NODE_ENV === 'local'
    ? 'src/**/*.entity.ts'
    : 'dist/**/*.entity.js';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.PSQL_HOSTNAME || 'localhost',
  port: parseInt(process.env.PSQL_PORT || '5432'),
  username: process.env.PSQL_USERNAME || 'postgres',
  password: process.env.PSQL_PASSWORD || 'postgres',
  database: process.env.PSQL_NAME || 'postgres',
  synchronize: false,
  logging: false,
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  entities: [migrationsEntities],
});
