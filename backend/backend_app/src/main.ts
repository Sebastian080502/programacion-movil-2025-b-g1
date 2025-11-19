import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Middleware CORS manual (ignora lo de enableCors)
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Origen que quieres permitir (localhost Ionic)
    res.header('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Métodos permitidos
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );

    // Headers permitidos
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    // Responder de una vez los preflight
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    next();
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

bootstrap();
