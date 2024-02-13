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
      host: process.env.DB_HOST ?? 'babar.db.elephantsql.com',
      port: parseInt(process.env.DB_PORT ?? "5432"),
      user: process.env.DB_USERNAME ?? 'azixrkfm',
      password: process.env.DB_PASSWORD ?? 'AH34v0SYL41ISh7iMkVYyCthOjStqbah',
      dbName: process.env.DB_DATABASE ?? 'azixrkfm',
    },
  };
});

export default config;

export const CocosConfigModule = ConfigModule.forRoot({
  envFilePath: '.env',
  load: [config],
  isGlobal: true,
});
