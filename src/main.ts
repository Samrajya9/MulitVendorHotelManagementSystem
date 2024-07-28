import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import GlobalExceptionFilter from './common/filters/global.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Multi Vendor Hotel Management System')
    .setDescription('Allow hotel owner to manage their hotel')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
