import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development.local', 'production.local')
    .default('development.local'),

  NEST_PORT: Joi.number().default(3001),
  MONGO_URL: Joi.string().required(),
  MONGO_USERNAME: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
});
