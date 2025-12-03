import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: [
    'https://localhost:8100',     // navegador Ionic
    'capacitor://localhost',     // apps nativas
    'https://localhost',          // fallback
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders:
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
});

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

bootstrap();
