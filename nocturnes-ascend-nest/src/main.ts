import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { initSwagger } from './core/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');
  initSwagger(app);

  await app.listen(process.env.NEST_PORT);
}

bootstrap().then(() => {
  console.log(`Listening on port: ${process.env.NEST_PORT}`);
});
