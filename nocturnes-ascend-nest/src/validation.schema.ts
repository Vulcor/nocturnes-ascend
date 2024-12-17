import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('develop', 'production').default('develop'),

  NEST_PORT: Joi.number().default(3001),
});
