import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { join } from 'path';

async function bootstrap() {
  const pathToApiYaml = join(__dirname, '../doc/api.yaml');
  const file = readFileSync(pathToApiYaml, 'utf8');
  const swaggerDocument = parse(file);
  const app = await NestFactory.create(AppModule);
  const doc = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('doc', app, doc);
  await app.listen(4000);
}
bootstrap();
