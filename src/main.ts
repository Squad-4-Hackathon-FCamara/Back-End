import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Orange Portfólio')
    .setDescription('Descrição de todas as rotas do Orange Portfólio - Hackaton FCamara')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Projetos')
    .addTag('Tags')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
