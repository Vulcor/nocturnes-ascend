import { initSwagger } from './core/swagger/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  initSwagger(app);

  await app.listen(process.env.NEST_PORT);
}

bootstrap().then(() => {
  console.log(`Listening on port: ${process.env.NEST_PORT}`);
});
