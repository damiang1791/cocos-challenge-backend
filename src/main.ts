import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('cocos-challenge-back')
    .setDescription('COCOS cocos-challenge-back description')
    .setVersion('1.0')
    .addTag('cocos-challenge-back')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
bootstrap();
