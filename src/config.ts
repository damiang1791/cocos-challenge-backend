import { ConfigModule, registerAs } from '@nestjs/config';

export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
}

export interface AppConfig {
  postgres: PostgresConfig;
}

const config = registerAs('config', (): AppConfig => {
  return {
    postgres: {
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      user: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      dbName: process.env.DB_DATABASE ?? 'postgres',
    },
  };
});

export default config;

export const CocosConfigModule = ConfigModule.forRoot({
  envFilePath: '.env',
  load: [config],
  isGlobal: true,
});
