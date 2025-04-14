import * as Joi from 'joi';
import appConfigurationSchema from './app-configuration.schema';
import databaseConfigurationSchema from './database-configuration.schema';
import authConfigurationSchema from './auth-configuration.schema';

const schemas = Joi.object()
  .concat(appConfigurationSchema())
  .concat(databaseConfigurationSchema())
  .concat(authConfigurationSchema())
  .unknown(true);

export default () => schemas;
