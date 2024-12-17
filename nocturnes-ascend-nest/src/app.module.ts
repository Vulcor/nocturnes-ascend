import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './validation.schema';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './core/filters/exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
