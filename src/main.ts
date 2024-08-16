import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exception/exception-filter';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const config = new DocumentBuilder().setTitle('API INVOICE').setDescription('API INVOICE TO BLUMBIT REACT NEXTJS COURSE').setVersion('1.0').addTag('invoice').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
