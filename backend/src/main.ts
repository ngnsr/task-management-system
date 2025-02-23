import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const port = process.env.PORT || 3000; // Default port
  const logger = new Logger('Bootstrap');
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
