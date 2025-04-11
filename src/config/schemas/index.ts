import * as Joi from 'joi';
import appConfigurationSchema from './app-configuration.schema';
import databaseConfigurationSchema from './database-configuration.schema';

const schemas = Joi.object()
  .concat(appConfigurationSchema())
  .concat(databaseConfigurationSchema())
  .unknown(true);

export default () => schemas;
