import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Travel project APIs')
    .setDescription('APIs for Travel project')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api_key', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
