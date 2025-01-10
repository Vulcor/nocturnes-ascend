// @nest
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

// @core
import { getMongooseConfig } from './core/config';
import { ExceptionsFilter } from './core/filters/exceptions.filter';

import { validationSchema } from './validation.schema';

// @Modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';
import { EncryptionModule } from './encription/encryption.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? '.env.development.local' : `.env.${ENV}`,
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => getMongooseConfig(configService),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    EncryptionModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
