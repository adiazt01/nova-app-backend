import appConfiguration from './app.configuration';
import authConfiguration from './auth.configuration';
import databaseConfiguration from './database.configuration';

export default () => [
  appConfiguration,
  databaseConfiguration,
  authConfiguration,
];
