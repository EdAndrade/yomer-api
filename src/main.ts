import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const SwaggerConfig = new DocumentBuilder()
    .setTitle('Yomer api')
    .setDescription('Yomer api endpoints specifications')
    .setVersion('1.0')
    .addTag('medics')
    .build();
  const SwaggerDocument = SwaggerModule.createDocument(app, SwaggerConfig)

  SwaggerModule.setup('api', app, SwaggerDocument)
  
  await app.listen(3000);
}
bootstrap();
