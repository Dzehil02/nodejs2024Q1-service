import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getSwaggerDocument } from './helpers/getSwaggerDoc';
import { config } from 'dotenv';
import { serve, setup } from 'swagger-ui-express';

config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
    const swaggerDocument = getSwaggerDocument();
    const app = await NestFactory.create(AppModule);
    app.use('/doc', serve, setup(swaggerDocument));
    await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
