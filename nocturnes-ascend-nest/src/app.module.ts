import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './validation.schema';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './core/filters/exceptions.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseConfig } from './core/config/mongoose';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? '.env.development.local' : `.env.${ENV}`,
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        getMongooseConfig(configService),
      inject: [ConfigService],
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
