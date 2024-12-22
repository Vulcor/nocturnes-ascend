import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongooseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const connectionUrl = configService
    .get<string>('MONGO_URL')
    .replace('<USERNAME>', configService.get<string>('MONGO_USERNAME'))
    .replace('<PASSWORD>', configService.get<string>('MONGO_PASSWORD'));

  return {
    uri: connectionUrl,
    autoCreate: false,
    autoIndex: false,
  };
};
