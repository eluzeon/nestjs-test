import { Options } from '@mikro-orm/core';
import { User } from './auth/entities/User';

export default {
  entities: [User],
  dbName: 'testdb.sqlite3',
  type: 'sqlite',
  debug: true,
  migrations: {
    path: 'src/migrations',
  },
} as Options;
