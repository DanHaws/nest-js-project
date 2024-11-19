import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DNS_URL = process.env.DNS_URL ?? 'http://localhost:3001';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: DNS_URL,
    methods: 'GET',
  });
  await app.listen(3000);
}
bootstrap();
