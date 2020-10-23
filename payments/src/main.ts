import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { config } from 'src/config';

const logger = new Logger('Payments');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: config.REDIS_URL
    },
  });
  await app.listen(() => logger.verbose(`Microservice is listening`));
}
bootstrap();
