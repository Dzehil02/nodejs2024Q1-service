import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerDocument } from './helpers/getSwaggerDoc';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const swaggerDocument = getSwaggerDocument();
  const app = await NestFactory.create(AppModule);
  const doc = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('doc', app, doc);
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
